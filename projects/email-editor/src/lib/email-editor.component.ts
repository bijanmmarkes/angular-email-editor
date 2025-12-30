import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { loadScript } from './loadScript';
import pkg from './source.json';
import { Editor, UnlayerOptions, ToolsConfig, JSONTemplate } from '../types';

declare namespace unlayer {
  function init(object);
  function createEditor(object);
  function loadDesign(object);
  function saveDesign(Function);
  function exportHtml(Function);
}

let lastEditorId = 0;

@Component({
  selector: 'email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.css'],
})
export class EmailEditorComponent implements AfterViewInit {
  @Input() editorId: string;
  @Input() options: UnlayerOptions = {};
  @Input() projectId: number;
  @Input() scriptUrl: string;
  @Input() tools: ToolsConfig;
  @Input() appearance: object;
  @Input() locale: string;
  @Input() id: string;

  @Input() minHeight = '500px';

  @Output() loaded = new EventEmitter();
  @Output() ready = new EventEmitter();

  editor: Editor;

  constructor() {}

  ngAfterViewInit() {
    if (!this.id) {
      this.id = this.editorId || `editor-${++lastEditorId}`;
    }
    loadScript(this.loadEditor.bind(this), this.scriptUrl);
  }

  protected loadEditor() {
    const options: UnlayerOptions = this.options || {};

    if (this.projectId) {
      options.projectId = this.projectId;
    }

    if (this.tools) {
      options.tools = this.tools;
    }

    if (this.appearance) {
      options.appearance = this.appearance;
    }

    if (this.locale) {
      options.locale = this.locale;
    }

    this.editor = unlayer.createEditor({
      ...options,
      id: this.id,
      displayMode: 'email',
      source: {
        name: pkg.name,
        version: pkg.version,
      },
    });

    this.loaded.emit({});

    this.editor.addEventListener('editor:ready', () => {
      this.ready.emit({});
    });
  }

  public loadDesign(data: JSONTemplate) {
    this.editor.loadDesign(data);
  }

  public saveDesign(cb: (data) => void) {
    this.editor.saveDesign(cb);
  }

  public exportHtml(cb: (data) => void) {
    this.editor.exportHtml(cb);
  }
}

# Angular Email Editor

The excellent drag-n-drop email editor by [Unlayer](https://unlayer.com/embed) as a [Angular](https://angular.io/) _wrapper component_. This is the most powerful and developer friendly visual email builder for your app.

> **Note:** This is a fork of the [official Unlayer Angular Email Editor](https://github.com/unlayer/angular-email-editor). We're maintaining this fork to provide support for newer versions of Angular (15-21), as the official repository has not been updated to support these versions.

|                                                           Video Overview                                                            |
| :---------------------------------------------------------------------------------------------------------------------------------: |
| [![Angular Email Editor](https://unroll-assets.s3.amazonaws.com/unlayervideotour.png)](https://www.youtube.com/watch?v=MIWhX-NF3j8) |
|                                        _Watch video overview: https://youtu.be/MIWhX-NF3j8_                                         |

## Live Demo

Check out the live demo here: https://angular-email-editor-demo.netlify.app/ ([Source Code](https://github.com/unlayer/angular-email-editor/tree/master/src))

## Installation

The easiest way to use Angular Email Editor is to install it from Npm or Yarn and include it in your own Angular build process.

```
npm install ng-email-editor --save
```

### Version Compatibility

This package supports Angular 15 through Angular 21. Install the version that matches your Angular version:

| Angular Version | Package Version | Install Command |
| --------------- | --------------- | --------------- |
| 21.x.x          | 21.0.0          | `npm install ng-email-editor@21.0.0` |
| 20.x.x          | 20.0.0          | `npm install ng-email-editor@20.0.0` |
| 19.x.x          | 19.0.0          | `npm install ng-email-editor@19.0.0` |
| 18.x.x          | 18.0.0          | `npm install ng-email-editor@18.0.0` |
| 17.x.x          | 17.0.0          | `npm install ng-email-editor@17.0.0` |
| 16.x.x          | 16.0.1          | `npm install ng-email-editor@16.0.1` |
| 15.x.x          | 15.2.0          | `npm install ng-email-editor@15.2.0` |

## Usage

Next, you'll need to import the Email Editor module in your app's module.

**app.module.ts**

> If you don't have an **app.module.ts** file, you can ignore this step and add `imports: [ EmailEditorModule ]` to your **app.component.ts** instead.

```ts
import { EmailEditorModule } from 'ng-email-editor';
...

@NgModule({
  ...
  imports: [ EmailEditorModule ],
  ...
});
```

**app.component.ts**

```ts
import { Component, ViewChild } from '@angular/core';
import { EmailEditorComponent, EmailEditorModule } from 'ng-email-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [EmailEditorModule],
})
export class AppComponent {
  title = 'angular-email-editor';
  options: EmailEditorComponent['options'] = {
    version: 'latest',
    appearance: {
      theme: 'modern_dark',
    },
  };

  @ViewChild(EmailEditorComponent)
  private emailEditor!: EmailEditorComponent;

  private get unlayer() {
    return this.emailEditor.editor;
  }

  // called when the editor is created
  editorLoaded() {
    console.log('editorLoaded');
    // load the design json here
    // you can get the design json by calling unlayer.exportHtml (see below)
    // this.unlayer.loadDesign({ /* json object here */ });
  }

  // called when the editor has finished loading
  editorReady() {
    console.log('editorReady');
  }

  exportHtml() {
    this.unlayer.exportHtml((result) => {
      // result object format: { html: string, design: object, amp: object, chunks: object }
      console.log('exportHtml', result);
    });
  }
}
```

**app.component.html**

```html
<div class="container">
  <button (click)="exportHtml()">Export</button>
  <email-editor
    [options]="options"
    (loaded)="editorLoaded()"
    (ready)="editorReady()"
  ></email-editor>
</div>
```

**Skip Lib Check**

Set `skipLibCheck: true` in `tsconfig.json`.

**tsconfig.json**

```ts
{
  "compilerOptions": {
    "skipLibCheck": true,
  }
}
```

See the [example source](https://github.com/unlayer/angular-email-editor/tree/master/src) for a reference implementation.

### Methods

All unlayer methods are available in `this.unlayer`. Here are the most used ones:

| method         | params              | description                                             |
| -------------- | ------------------- | ------------------------------------------------------- |
| **loadDesign** | `Object data`       | Takes the design JSON and loads it in the editor        |
| **saveDesign** | `Function callback` | Returns the design JSON in a callback function          |
| **exportHtml** | `Function callback` | Returns the design HTML and JSON in a callback function |

See the [Unlayer Docs](https://docs.unlayer.com/) for all available methods, or log the object in the console to explore it.


### Properties

- `editorId` `String` HTML div id of the container where the editor will be embedded (optional)
- `minHeight` `String` minimum height to initialize the editor with (default 500px)
- `options` `Object` options passed to the Unlayer editor instance (default {})
- `tools` `Object` configuration for the built-in and custom tools (default {})
- `appearance` `Object` configuration for appearance and theme (default {})
- `projectId` `Integer` Unlayer project ID (optional)
- `loaded` `Function` called when the editor instance is created
- `ready` `Function` called when the editor has finished loading

See the [Unlayer Docs](https://docs.unlayer.com/) for all available options.

## Custom Tools

Custom tools can help you add your own content blocks to the editor. Every application is different and needs different tools to reach it's full potential. [Learn More](https://docs.unlayer.com/docs/custom-tools)

[![Custom Tools](https://unroll-assets.s3.amazonaws.com/custom_tools.png)](https://docs.unlayer.com/docs/custom-tools)

## Localization

You can submit new language translations by creating a PR on this GitHub repo: https://github.com/unlayer/translations. Translations managed by [PhraseApp](https://phraseapp.com)

### License

Copyright (c) 2025 Unlayer. [MIT](LICENSE) Licensed.

## Changelog

### Version 21.0.0 (2025-12-30)
- Added Angular 21 support
- Updated to TypeScript 5.9
- Migrated to ES2022 target

### Version 20.0.0 (2025-12-30)
- Added Angular 20 support
- Updated to TypeScript 5.6

### Version 19.0.0 (2025-12-30)
- Added Angular 19 support
- Updated to TypeScript 5.4
- Fixed standalone component compatibility

### Version 18.0.0 (2025-12-30)
- Added Angular 18 support
- Updated to TypeScript 5.2

### Version 17.0.0 (2025-12-30)
- Added Angular 17 support
- Updated to TypeScript 5.1

### Version 16.0.1 (2025-12-30)
- Added Angular 16 support
- Updated to TypeScript 4.9

### Version 15.2.0 (2025-12-30)
- Initial release with Angular 15 support
- TypeScript 4.8 support
- Comprehensive test coverage
- Fixed change detection issues
- Added proper peer dependencies

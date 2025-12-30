import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailEditorComponent } from './email-editor.component';

// Mock the unlayer global
declare global {
  interface Window {
    unlayer: any;
  }
}

describe('EmailEditorComponent', () => {
  let component: EmailEditorComponent;
  let fixture: ComponentFixture<EmailEditorComponent>;
  let mockEditor: any;

  beforeEach(async () => {
    // Create mock editor
    mockEditor = {
      addEventListener: jasmine.createSpy('addEventListener'),
      loadDesign: jasmine.createSpy('loadDesign'),
      saveDesign: jasmine.createSpy('saveDesign'),
      exportHtml: jasmine.createSpy('exportHtml')
    };

    // Mock global unlayer
    (window as any).unlayer = {
      createEditor: jasmine.createSpy('createEditor').and.returnValue(mockEditor)
    };

    await TestBed.configureTestingModule({
      declarations: [ EmailEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailEditorComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    delete (window as any).unlayer;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate unique editor id when not provided', () => {
    const fixture1 = TestBed.createComponent(EmailEditorComponent);
    const comp1 = fixture1.componentInstance;
    comp1.ngOnInit();
    
    const fixture2 = TestBed.createComponent(EmailEditorComponent);
    const comp2 = fixture2.componentInstance;
    comp2.ngOnInit();
    
    expect(comp1.id).toBeTruthy();
    expect(comp2.id).toBeTruthy();
    expect(comp1.id).not.toBe(comp2.id);
  });

  it('should use provided editorId', () => {
    const newFixture = TestBed.createComponent(EmailEditorComponent);
    const newComponent = newFixture.componentInstance;
    newComponent.editorId = 'custom-editor-id';
    newComponent.ngOnInit();
    expect(newComponent.id).toBe('custom-editor-id');
  });

  it('should set default minHeight to 500px', () => {
    expect(component.minHeight).toBe('500px');
  });

  it('should initialize editor with correct options', () => {
    component.projectId = 123;
    component.tools = { tool1: { enabled: true } };
    component.appearance = { theme: 'dark' };
    component.locale = 'en-US';
    component.options = { displayMode: 'web' };

    // Trigger loadEditor
    component['loadEditor']();

    expect((window as any).unlayer.createEditor).toHaveBeenCalledWith(
      jasmine.objectContaining({
        projectId: 123,
        tools: { tool1: { enabled: true } },
        appearance: { theme: 'dark' },
        locale: 'en-US',
        displayMode: 'email',
        id: component.id
      })
    );
  });

  it('should emit loaded event after editor creation', () => {
    spyOn(component.loaded, 'emit');
    
    component['loadEditor']();
    
    expect(component.loaded.emit).toHaveBeenCalledWith({});
  });

  it('should emit ready event when editor is ready', () => {
    spyOn(component.ready, 'emit');
    
    // Setup mock to capture the event listener callback
    let readyCallback: Function;
    mockEditor.addEventListener.and.callFake((event: string, callback: Function) => {
      if (event === 'editor:ready') {
        readyCallback = callback;
      }
    });

    component['loadEditor']();
    
    // Trigger the ready event
    if (readyCallback) {
      readyCallback();
    }
    
    expect(component.ready.emit).toHaveBeenCalledWith({});
  });

  it('should load design', () => {
    component['loadEditor']();
    const designData: any = { body: { rows: [] } };
    
    component.loadDesign(designData);
    
    expect(mockEditor.loadDesign).toHaveBeenCalledWith(designData);
  });

  it('should save design with callback', () => {
    component['loadEditor']();
    const callback = jasmine.createSpy('callback');
    
    component.saveDesign(callback);
    
    expect(mockEditor.saveDesign).toHaveBeenCalledWith(callback);
  });

  it('should export html with callback', () => {
    component['loadEditor']();
    const callback = jasmine.createSpy('callback');
    
    component.exportHtml(callback);
    
    expect(mockEditor.exportHtml).toHaveBeenCalledWith(callback);
  });

  it('should merge custom options with defaults', () => {
    component.options = { displayMode: 'web' } as any;
    
    component['loadEditor']();
    
    expect((window as any).unlayer.createEditor).toHaveBeenCalledWith(
      jasmine.objectContaining({
        displayMode: 'email'
      })
    );
  });
});

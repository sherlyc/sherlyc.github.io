import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExternalContentUnitComponent } from './external-content-unit.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { ScriptInjectorService } from '../../services/script-injector/script-injector.service';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { ScriptId } from '../../services/script-injector/__types__/ScriptId';
import { Position } from '../../services/script-injector/__types__/Position';
import { RuntimeService } from '../../services/runtime/runtime.service';

describe('ExternalContentUnitComponent', () => {
  let component: ExternalContentUnitComponent;
  let fixture: ComponentFixture<ExternalContentUnitComponent>;
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: () => 'safe',
            bypassSecurityTrustResourceUrl: (url: string) => url
          }
        },
        {
          provide: ScriptInjectorService,
          useClass: mockService(ScriptInjectorService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ],
      declarations: [ExternalContentUnitComponent]
    }).compileComponents();

    scriptInjectorService = TestBed.get(ScriptInjectorService);
    runtimeService = TestBed.get(RuntimeService);
    fixture = TestBed.createComponent(ExternalContentUnitComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.input = {
      type: ContentBlockType.ExternalContentUnit,
      url: 'https://example.com',
      height: '100px',
      width: '100%'
    };

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load script if provided in browser', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    const scriptUrl = 'https://script.com';
    component.input = {
      type: ContentBlockType.ExternalContentUnit,
      url: 'https://example.com',
      height: '100px',
      width: '100%',
      scriptUrl: scriptUrl
    };
    fixture.detectChanges();

    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      ScriptId.neighbourlyTopStories,
      scriptUrl,
      Position.BOTTOM
    );
  });

  it('should not load script if not provided in browser', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    component.input = {
      type: ContentBlockType.ExternalContentUnit,
      url: 'https://example.com',
      height: '100px',
      width: '100%',
    };
    fixture.detectChanges();

    expect(scriptInjectorService.load).not.toHaveBeenCalled();
  });

  it('should not load script if provided in server', () => {
    runtimeService.isBrowser.mockReturnValue(false);
    component.input = {
      type: ContentBlockType.ExternalContentUnit,
      url: 'https://example.com',
      height: '100px',
      width: '100%',
      scriptUrl: 'https://script.com'
    };
    fixture.detectChanges();

    expect(scriptInjectorService.load).not.toHaveBeenCalled();
  });
});

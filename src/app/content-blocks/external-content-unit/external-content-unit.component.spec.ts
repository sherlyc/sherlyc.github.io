import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExternalContentUnitComponent } from './external-content-unit.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { ScriptInjectorService } from '../../services/script-injector/script-injector.service';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
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
});

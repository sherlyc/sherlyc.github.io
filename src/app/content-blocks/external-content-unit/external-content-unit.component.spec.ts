import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExternalContentUnitComponent } from './external-content-unit.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';

describe('ExternalContentUnitComponent', () => {
  let component: ExternalContentUnitComponent;
  let fixture: ComponentFixture<ExternalContentUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: () => 'safe',
            bypassSecurityTrustResourceUrl: (url: string) => url
          }
        }
      ],
      declarations: [ExternalContentUnitComponent]
    }).compileComponents();

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
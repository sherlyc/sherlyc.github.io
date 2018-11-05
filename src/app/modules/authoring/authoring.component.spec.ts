import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StuffCustomMaterialModule } from '../../shared/stuff-custom-material/stuff-custom-material.module';
import { AuthoringComponent } from './authoring.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthoringComponent', () => {
  let component: AuthoringComponent;
  let fixture: ComponentFixture<AuthoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StuffCustomMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ AuthoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

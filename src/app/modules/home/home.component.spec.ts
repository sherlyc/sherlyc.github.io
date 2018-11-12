import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StuffCustomMaterialModule } from '../../shared/stuff-custom-material/stuff-custom-material.module';
import { HomeComponent } from './home.component';
import { AuthoringComponent } from './../authoring/authoring.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StuffCustomMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ HomeComponent, AuthoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

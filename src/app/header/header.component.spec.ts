import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StuffCustomMaterialModule } from '../stuff-custom-material/stuff-custom-material.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StuffCustomMaterialModule
      ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app name in span with class logo', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span.logo').textContent).toContain('Composer');
  }));

  it('should have user information section', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.user-account')).toBeTruthy();
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StuffCustomMaterialModule } from '../../shared/stuff-custom-material/stuff-custom-material.module';
import { HeaderComponent } from './header.component';
import { IconComponent } from '../icon/icon.component';
import { ColorBarComponent } from '../color-bar/color-bar.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StuffCustomMaterialModule
      ],
      declarations: [ HeaderComponent, IconComponent, ColorBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // inputs
    component.mainNavLink = {text: 'national', href: '/national'};
    component.subNavLink = {text: 'politics', href: '/national/politics'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app name in header', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.main-navigation__link').textContent).toContain(component.mainNavLink.text);
    expect(compiled.querySelector('.sub-nav__heading').textContent).toContain(component.subNavLink.text);
  }));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StuffCustomMaterialModule } from '../../shared/stuff-custom-material/stuff-custom-material.module';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../shared.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StuffCustomMaterialModule,
        SharedModule
      ],
      declarations: []
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

  it('should render main-nav and sub-nav in header', () => {
    // given
    component.mainNavLink = {text: 'national', href: '/national'};
    component.subNavLink = {text: 'politics', href: '/national/politics'};
    // when
    fixture.detectChanges();
    // then
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.header__main-navigation__link').textContent).toContain(component.mainNavLink.text);
    expect(compiled.querySelector('.header__sub-nav__heading').textContent).toContain(component.subNavLink.text);
  });

  it('should not render main-nav not given main-nav link', () => {
    // given
    component.mainNavLink = undefined;
    // when
    fixture.detectChanges();
    // then
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.header__main-navigation')).toBeNull();
  });

  it('should not render sub-nav not given sub-nav link', () => {
    // given
    component.subNavLink = undefined;
    // when
    fixture.detectChanges();
    // then
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.header__sub-nav')).toBeNull();
  });
});

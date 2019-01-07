import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { ColorBarComponent } from '../color-bar/color-bar.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent, ColorBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer links correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.footer__link').length).toBe(
      component.footerLinks.length
    );

    const footerLinksNodes = Array.from(
      compiled.querySelectorAll('.footer__link a')
    );
    const footerLinksText = footerLinksNodes.map((el: any) =>
      el.textContent.trim()
    );
    const footerLinksHrefs = footerLinksNodes.map((el: any) =>
      el.getAttribute('href')
    );

    component.footerLinks.forEach((link) => {
      expect(footerLinksText).toContain(link.title);
      expect(footerLinksHrefs).toContain(link.url);
    });
  });

  it('should render footer icons correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    expect(
      compiled.querySelectorAll('.footer__secondary-social--icon').length
    ).toBe(component.footerIcons.length);

    const footerIconNodes = Array.from(
      compiled.querySelectorAll('.footer__secondary-social--icon a')
    );
    const footerIconsHrefs = footerIconNodes.map((el: any) =>
      el.getAttribute('href')
    );

    component.footerIcons.forEach((icon) => {
      expect(footerIconsHrefs).toContain(icon.href);
    });
  });

  it('should show copyright with current year correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const currentYear = new Date().getFullYear();
    expect(
      compiled
        .querySelector('.footer__secondary-copyright p')
        .textContent.trim()
    ).toContain(currentYear);
  });
});

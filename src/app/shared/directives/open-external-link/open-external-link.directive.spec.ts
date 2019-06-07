import { Component, Input } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { OpenExternalLinkDirective } from './open-external-link.directive';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-fake-anchor',
  template: '<a href="{{ linkUrl }}" [appOpenExternalLink]="linkUrl"></a>'
})
class FakeAnchorComponent {
  linkUrl!: string;
}

describe('OpenExternalLinkDirective', () => {
  let fixture: ComponentFixture<FakeAnchorComponent>;
  let component: FakeAnchorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeAnchorComponent, OpenExternalLinkDirective]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FakeAnchorComponent]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(FakeAnchorComponent);
    component = fixture.componentInstance;
  });

  it('should not set open external link attributes when no url is provided', () => {
    component.linkUrl = '';
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a')).nativeElement;

    expect(anchor.getAttribute('target')).toBeFalsy();
    expect(anchor.getAttribute('rel')).toBeFalsy();
  });

  it('should not set open external link attributes when url is internal', () => {
    component.linkUrl = '/national/123123/hello-world';
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a')).nativeElement;

    expect(anchor.getAttribute('target')).toBeFalsy();
    expect(anchor.getAttribute('rel')).toBeFalsy();
  });

  it('should set open external link attributes when url is external', () => {
    component.linkUrl = 'https://interactive.stuff.co.nz/some-url-article';
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a')).nativeElement;

    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should set open external link attributes when url is external and contains casing', () => {
    component.linkUrl = 'HTTPS://interactive.stuff.co.nz/some-url-article';
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a')).nativeElement;

    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
  });
});

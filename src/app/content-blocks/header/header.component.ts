import { Component, Inject, Input, Renderer2 } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IHeader } from '../../../../common/__types__/IHeader';
import { DOCUMENT } from '@angular/common';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements IContentBlockComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private analyticsService: AnalyticsService
  ) {}

  @Input() input!: IHeader;
  navigationVisible = false;
  sections = [
    {
      theme: 'light',
      items: [
        { label: 'National', link: '/national' },
        { label: 'Sport', link: '/sport' },
        { label: 'Life & Style', link: '/life-style' },
        { label: 'World', link: '/world' },
        { label: 'Entertainment', link: '/entertainment' },
        { label: 'Business', link: '/business' },
        { label: 'Homed', link: '/life-style/homed' },
        { label: 'Opinion', link: '/opinion' },
        { label: 'Travel', link: '/travel' },
        { label: 'Technology', link: '/technology' },
        { label: 'Stuff Nation', link: '/stuff-nation' },
        { label: 'Motoring', link: '/motoring' }
      ]
    },
    {
      theme: 'dark',
      items: [
        { label: 'Auckland', link: '/auckland' },
        { label: 'Wellington', link: '/dominion-post' },
        { label: 'Canterbury', link: '/the-press' },
        { label: 'Waikato', link: '/waikato-times' },
        { label: 'Bay of Plenty', link: '/bay-of-plenty' },
        { label: 'Taranaki', link: '/taranaki-daily-news' },
        { label: 'Manawatu', link: '/manawatu-standard' },
        { label: 'Nelson', link: '/nelson-mail' },
        { label: 'Marlborough', link: '/marlborough-express' },
        { label: 'Timaru', link: '/timaru-herald' },
        { label: 'Otago', link: '/otago' },
        { label: 'Southland', link: '/southland-times' }
      ]
    },
    {
      theme: 'grey',
      items: [
        { label: 'Careers', link: 'https://careers.stuff.co.nz' },
        { label: 'Advertising', link: 'https://advertise.stuff.co.nz' },
        { label: 'Contact', link: '/about-stuff/94800421/contact-us' },
        { label: 'Privacy', link: '/about-stuff/100909861/privacy-policy' }
      ]
    }
  ];

  toggleMenu() {
    this.navigationVisible = !this.navigationVisible;
    if (this.navigationVisible) {
      this.renderer.addClass(this.document.body, 'noScroll');
    } else {
      this.renderer.removeClass(this.document.body, 'noScroll');
    }
  }

  sendMenuAnalytics() {
    this.analyticsService.pushEvent({
      event: this.navigationVisible ? 'menu.nav' : 'close.menu.nav'
    });
  }

  sendLogoAnalytics() {
    this.analyticsService.pushEvent({ event: 'stuff.logo' });
  }
}

import { Component, Inject, Input, Renderer2, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IHeader } from '../../../../common/__types__/IHeader';
import { DOCUMENT } from '@angular/common';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { ConfigService } from '../../services/config/config.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements IContentBlockComponent, OnInit {
  private imgSrc = '';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private analyticsService: AnalyticsService,
    private configService: ConfigService,
    private authenticationService: AuthenticationService
  ) {}

  isLoggedIn = false;
  profileUrl?: string;

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

  ngOnInit() {
    this.authenticationService.setup();
    this.authenticationService.authenticationStateChange.subscribe(
      (user: any) => {
        if (user) {
          this.isLoggedIn = true;
          this.imgSrc = user.profile.picture;
        } else {
          this.isLoggedIn = false;
        }
      }
    );
    this.profileUrl = `${
      this.configService.getConfig().loginLibrary.authProvider
    }/publicprofile`;
  }

  toggleMenu() {
    this.navigationVisible = !this.navigationVisible;
    if (this.navigationVisible) {
      this.renderer.addClass(this.document.body, 'noScroll');
    } else {
      this.renderer.removeClass(this.document.body, 'noScroll');
    }
  }

  sendMenuAnalytics() {
    if (this.navigationVisible) {
      this.analyticsService.pushEvent({
        type: AnalyticsEventsType.MENU_NAV_OPENED
      });
    }
  }

  sendLogoAnalytics() {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.STUFF_LOGO_CLICKED
    });
  }

  sendMenuSectionClickAnalytics(section: string) {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.MENU_NAV_SECTION_CLICKED,
      section
    });
  }

  login() {
    this.authenticationService.login();
  }
}

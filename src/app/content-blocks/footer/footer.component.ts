import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IFooter } from '../../../../common/__types__/IFooter';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { CookieService } from '../../services/cookie/cookie.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements IContentBlockComponent {
  constructor(
    private analyticsService: AnalyticsService,
    private cookieService: CookieService
  ) {}

  @Input() input!: IFooter;

  sendLinkAnalytics(name: string) {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: name
    });
  }

  goDesktop() {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);

    this.cookieService.set('site-view', 'd', {
      domain: '.stuff.co.nz',
      path: '/',
      expires: now
    });
  }
}

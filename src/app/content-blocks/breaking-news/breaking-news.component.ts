import { Component } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';
import { CookieNames } from '../../../../common/__types__/CookieNames';
import { CookieService } from '../../services/cookie/cookie.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.scss']
})
export class BreakingNewsComponent implements IContentBlockComponent {
  input!: IBreakingNews;
  shouldHide = false;
  analyticsEvents = AnalyticsEventsType;

  constructor(
    private cookieService: CookieService,
    private analyticsService: AnalyticsService
  ) {
  }

  onClickOrDismiss() {
    const domain = window && window.location && window.location.hostname;
    this.cookieService.set(CookieNames.IGNORE_BREAKING_NEWS, this.input.id, {
      path: '/',
      domain
    });
    this.shouldHide = true;
  }

  sendAnalytics(isDismissing: boolean) {
    this.analyticsService.pushEvent(isDismissing ?
      this.analyticsEvents.BREAKING_NEWS_CLOSE :
      this.analyticsEvents.BREAKING_NEWS_OPEN
    );
  }
}

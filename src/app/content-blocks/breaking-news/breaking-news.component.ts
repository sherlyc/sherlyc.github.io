import { Component, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';
import { CookieNames } from '../../../../common/__types__/CookieNames';
import { CookieService } from '../../services/cookie/cookie.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { WindowService } from '../../services/window/window.service';
import { StorageKeys, StoreService } from '../../services/store/store.service';
import { RuntimeService } from '../../services/runtime/runtime.service';

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.scss']
})
export class BreakingNewsComponent implements OnInit, IContentBlockComponent {
  input!: IBreakingNews;
  shouldHide = true;

  constructor(
    private cookieService: CookieService,
    private analyticsService: AnalyticsService,
    private windowService: WindowService,
    private storeService: StoreService,
    private runtimeService: RuntimeService
  ) {}

  ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      this.shouldHide =
        this.isDismissedInSpade() || this.isDismissedInOtherApp();
    }
  }

  private isDismissedInOtherApp() {
    const cookiesBreakingNewsId = this.cookieService.get(
      CookieNames.IGNORE_BREAKING_NEWS
    );
    return cookiesBreakingNewsId === this.input.id;
  }

  private isDismissedInSpade() {
    const storeBreakingNewsId = this.storeService.get<string>(
      StorageKeys.BreakingNewsId
    );
    return storeBreakingNewsId === this.input.id;
  }

  onClickOrDismiss() {
    const domain = this.windowService.getWindow().location.hostname;
    this.cookieService.set(CookieNames.IGNORE_BREAKING_NEWS, this.input.id, {
      path: '/',
      domain
    });
    this.storeService.set(StorageKeys.BreakingNewsId, this.input.id);
    this.shouldHide = true;
  }

  sendAnalytics(isDismissing: boolean) {
    this.analyticsService.pushEvent({
      type: isDismissing
        ? AnalyticsEventsType.BREAKING_NEWS_CLOSED
        : AnalyticsEventsType.BREAKING_NEWS_OPENED
    });
  }
}

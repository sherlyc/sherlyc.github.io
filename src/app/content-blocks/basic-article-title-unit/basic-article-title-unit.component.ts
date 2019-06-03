import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnalyticsEventsType } from 'src/app/services/analytics/__types__/AnalyticsEventsType';

@Component({
  selector: 'app-basic-article-title-unit',
  templateUrl: './basic-article-title-unit.html',
  styleUrls: ['./basic-article-title-unit.scss']
})
export class BasicArticleTitleUnitComponent implements IContentBlockComponent {
  @Input() input!: IBasicArticleTitleUnit;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics() {
    const { strapName, indexHeadline, id } = this.input;
    this.analyticsService.pushEvent(
      AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      new Map()
        .set('homepage.strap', strapName)
        .set('article.headline', indexHeadline)
        .set('article.id', id)
    );
  }
}

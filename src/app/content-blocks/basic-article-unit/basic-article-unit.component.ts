import { Component, Input, OnInit } from '@angular/core';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnalyticsEventsType } from 'src/app/services/analytics/__types__/AnalyticsEventsType';

@Component({
  selector: 'app-basic-article-unit',
  templateUrl: './basic-article-unit.component.html',
  styleUrls: ['./basic-article-unit.component.scss']
})
export class BasicArticleUnitComponent implements IContentBlockComponent {
  @Input() input!: IBasicArticleUnit;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics() {
    const { strapName, indexHeadline, id } = this.input;

    this.analyticsService.pushEvent(
      AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      new Map()
        .set('strapName', strapName)
        .set('articleHeadline', indexHeadline)
        .set('articleId', id)
    );
  }
}

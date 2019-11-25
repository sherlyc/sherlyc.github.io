import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-gray-defcon-article-unit-component',
  templateUrl: './gray-defcon-article-unit.component.html',
  styleUrls: ['./gray-defcon-article-unit.component.scss']
})
export class GrayDefconArticleUnitComponent implements IContentBlockComponent {
  @Input() input!: IDefconArticleUnit;
  index!: number;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics() {
    const { strapName, title, id } = this.input;

    console.log('sending gray defcon', strapName, title, id);

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: id
    });
  }
}

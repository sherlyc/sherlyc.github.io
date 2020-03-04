import { Component, Input } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { IHalfWidthImageArticleUnit } from "../../../../common/__types__/IHalfWidthImageArticleUnit";

@Component({
  selector: "app-half-width-image-article-unit",
  templateUrl: "./half-width-image-article-unit.component.html",
  styleUrls: ["./half-width-image-article-unit.component.scss"]
})
export class HalfWidthImageArticleUnitComponent
  implements IContentBlockComponent {
  @Input() input!: IHalfWidthImageArticleUnit;
  index!: number;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics() {
    const { strapName, title, id } = this.input;

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: id
    });
  }
}

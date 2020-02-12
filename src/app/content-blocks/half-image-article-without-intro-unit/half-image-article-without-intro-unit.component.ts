import { Component, Input } from "@angular/core";
import { IHalfImageArticleWithoutIntroUnit } from "../../../../common/__types__/IHalfImageArticleWithoutIntroUnit";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-half-image-article-without-intro-unit",
  templateUrl: "./half-image-article-without-intro-unit.component.html",
  styleUrls: ["./half-image-article-without-intro-unit.component.scss"]
})
export class HalfImageArticleWithoutIntroUnitComponent
  implements IContentBlockComponent {
  @Input() input!: IHalfImageArticleWithoutIntroUnit;
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

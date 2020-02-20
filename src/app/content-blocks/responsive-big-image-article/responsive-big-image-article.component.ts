import { Component, HostBinding, Input } from "@angular/core";
import { IResponsiveBigImageArticleUnit } from "../../../../common/__types__/IResponsiveBigImageArticleUnit";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-responsive-big-image-article",
  templateUrl: "./responsive-big-image-article.component.html",
  styleUrls: ["./responsive-big-image-article.component.scss"]
})
export class ResponsiveBigImageArticleComponent {
  @Input() input!: IResponsiveBigImageArticleUnit;
  @HostBinding("class.pumped") get pumped() {
    return this.input.pumped;
  }
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

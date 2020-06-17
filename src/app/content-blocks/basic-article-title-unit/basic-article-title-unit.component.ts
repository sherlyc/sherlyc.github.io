import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-basic-article-title-unit",
  templateUrl: "./basic-article-title-unit.html",
  styleUrls: ["./basic-article-title-unit.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicArticleTitleUnitComponent implements IContentBlockComponent {
  @Input() input!: IBasicArticleTitleUnit;
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

import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-basic-article-unit",
  templateUrl: "./basic-article-unit.component.html",
  styleUrls: ["./basic-article-unit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicArticleUnitComponent implements IContentBlockComponent {
  @Input() input!: IBasicArticleUnit;
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

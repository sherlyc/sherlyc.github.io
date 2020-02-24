import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { IArticleTitle } from "../../../../common/__types__/IArticleTitle";

@Component({
  selector: "app-article-title",
  templateUrl: "./article-title.html",
  styleUrls: ["./article-title.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleTitleComponent implements IContentBlockComponent {
  @Input() input!: IArticleTitle;
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

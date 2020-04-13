import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IArticleTitle } from "../../../../common/__types__/IArticleTitle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-article-title",
  templateUrl: "./article-title.component.html",
  styleUrls: ["./article-title.component.scss"],
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

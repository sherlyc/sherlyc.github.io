import { Component, Input } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IVerticalArticleList } from "../../../../common/__types__/IVerticalArticleList";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";

@Component({
  selector: "app-vertical-article-list",
  templateUrl: "./vertical-article-list.component.html",
  styleUrls: ["./vertical-article-list.component.scss"]
})
export class VerticalArticleListComponent implements IContentBlockComponent {
  @Input() input!: IVerticalArticleList;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics(id: string, title: string) {
    const { strapName } = this.input;

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: id
    });
  }
}

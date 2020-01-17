import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IDarkGradientArticle } from "../../../../common/__types__/IDarkGradientArticle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-dark-gradient-article",
  templateUrl: "./dark-gradient-article.component.html",
  styleUrls: ["./dark-gradient-article.component.scss"]
})
export class DarkGradientArticleComponent implements IContentBlockComponent {
  @Input() input!: IDarkGradientArticle;
  index?: number;

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

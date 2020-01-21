import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { ITextBoxArticle } from "../../../../common/__types__/ITextBoxArticle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-text-box-article",
  templateUrl: "./text-box-article.component.html",
  styleUrls: ["./text-box-article.component.scss"]
})
export class TextBoxArticleComponent implements IContentBlockComponent {
  @Input() input!: ITextBoxArticle;
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

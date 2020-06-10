import { Component, Input, OnInit } from "@angular/core";
import { IHomepageHighlightArticle } from "../../../../common/__types__/IHomepageHighlightArticle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-homepage-highlight-article",
  templateUrl: "./homepage-highlight-article.component.html",
  styleUrls: ["./homepage-highlight-article.component.scss"]
})
export class HomepageHighlightArticleComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IHomepageHighlightArticle;
  index!: number;
  classNames: string[] = [];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.classNames = [`variation-${this.input.variation.toLowerCase()}`];
  }

  sendAnalytics() {
    const { strapName, title } = this.input.analytics;

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: this.input.id
    });
  }
}

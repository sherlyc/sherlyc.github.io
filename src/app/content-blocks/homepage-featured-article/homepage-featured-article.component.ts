import { Component, Input, OnInit } from "@angular/core";
import { IHomepageFeaturedArticle } from "../../../../common/__types__/IHomepageFeaturedArticle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-homepage-featured-article",
  templateUrl: "./homepage-featured-article.component.html",
  styleUrls: ["./homepage-featured-article.component.scss"]
})
export class HomepageFeaturedArticleComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IHomepageFeaturedArticle;
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

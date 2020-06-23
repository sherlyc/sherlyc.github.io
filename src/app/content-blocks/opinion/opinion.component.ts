import { Component, Input, OnInit } from "@angular/core";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { IOpinion } from "../../../../common/__types__/IOpinion";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-opinion",
  templateUrl: "./opinion.component.html",
  styleUrls: ["./opinion.component.scss"]
})
export class OpinionComponent implements IContentBlockComponent, OnInit {
  @Input()
  input!: IOpinion;
  formattedArticles: IHomepageArticleContent[] = [];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.formattedArticles = this.input.articles.map((article, index) => ({
      ...article,
      byline: article.byline?.toLowerCase(),
      image: {
        ...article.image,
        sixteenByNine:
          index > 0
            ? `${article.image.sixteenByNine}?format=pjpg&crop=1:1,smart`
            : article.image.sixteenByNine
      }
    }));
  }

  sendAnalytics(item: IHomepageArticleContent) {
    const { title, id } = item;
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: this.input.strapName,
      articleHeadline: title,
      articleId: id
    });
  }
}

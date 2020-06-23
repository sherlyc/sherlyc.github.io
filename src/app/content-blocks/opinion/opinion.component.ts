import { Component, Input, OnInit } from "@angular/core";
import { AspectRatio } from "../../../../common/AspectRatio";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { IOpinion } from "../../../../common/__types__/IOpinion";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-opinion",
  templateUrl: "./opinion.component.html",
  styleUrls: ["./opinion.component.scss"]
})
export class OpinionComponent implements IContentBlockComponent, OnInit {
  @Input()
  input!: IOpinion;
  formattedCartoons: IHomepageArticleContent[] = [];
  formattedArticles: IHomepageArticleContent[] = [];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.formattedArticles = this.formatArticles(
      this.input.articles,
      AspectRatio.OneByOne
    );
    this.formattedCartoons = this.formatArticles(
      this.input.cartoons,
      AspectRatio.SixteenByNine
    );
  }

  private formatArticles(
    articles: IHomepageArticleContent[],
    aspectRatio: AspectRatio
  ) {
    return articles.map((article, index) => ({
      ...article,
      byline: article.byline?.toLowerCase(),
      image: {
        ...article.image,
        sixteenByNine: `${article.image.sixteenByNine}?format=pjpg&crop=${aspectRatio},smart`
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

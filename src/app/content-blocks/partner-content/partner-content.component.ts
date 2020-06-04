import { Component, Input, OnInit } from "@angular/core";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  IHomepageArticle,
  Orientation
} from "../../../../common/__types__/IHomepageArticle";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { IPartnerContent } from "../../../../common/__types__/IPartnerContent";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-partner-content",
  templateUrl: "./partner-content.component.html",
  styleUrls: ["./partner-content.component.scss"]
})
export class PartnerContentComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IPartnerContent;
  homepageArticles: IHomepageArticle[] = [];
  bulletList: IHomepageArticleContent[] = [];
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.homepageArticles = this.input.articles
      .slice(0, 2)
      .map((homepageArticleContent) => ({
        type: ContentBlockType.HomepageArticle,
        id: homepageArticleContent.id,
        introText: undefined,
        headline: homepageArticleContent.headline,
        color: homepageArticleContent.color,
        linkUrl: homepageArticleContent.linkUrl,
        headlineFlags: homepageArticleContent.headlineFlags,
        lastPublishedTime: homepageArticleContent.lastPublishedTime,
        analytics: {
          title: homepageArticleContent.title,
          strapName: this.input.strapName
        },
        imageSrc: homepageArticleContent.image.sixteenByNine,
        category: homepageArticleContent.category,
        orientation: {
          mobile: Orientation.Portrait,
          tablet: Orientation.Portrait,
          desktop: Orientation.Portrait
        }
      }));
    this.bulletList = this.input.articles.slice(2);
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

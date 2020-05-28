import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IPartnerContent } from "../../../../common/__types__/IPartnerContent";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import {
  IHomepageArticle,
  Orientation
} from "../../../../common/__types__/IHomepageArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";

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
        linkUrl: homepageArticleContent.linkUrl,
        headlineFlags: homepageArticleContent.headlineFlags,
        lastPublishedTime: homepageArticleContent.lastPublishedTime,
        analytics: {
          title: homepageArticleContent.title,
          strapName: this.input.strapName
        },
        imageSrc: homepageArticleContent.image.sixteenByNine,
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

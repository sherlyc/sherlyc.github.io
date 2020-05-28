import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IPartnerContent } from "../../../../common/__types__/IPartnerContent";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import {
  IHomepageArticle,
  Orientation
} from "../../../../common/__types__/IHomepageArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

@Component({
  selector: "app-partner-content",
  templateUrl: "./partner-content.component.html",
  styleUrls: ["./partner-content.component.scss"]
})
export class PartnerContentComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IPartnerContent;
  homepageArticles: IHomepageArticle[] = [];
  bulletList: IHomepageArticleContent[] = [];
  constructor() {}

  ngOnInit(): void {
    this.homepageArticles = this.input.articles
      .slice(0, 2)
      .map((homepageArticleContent) => ({
        type: ContentBlockType.HomepageArticle,
        id: homepageArticleContent.id,
        introText: homepageArticleContent.introText,
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
}

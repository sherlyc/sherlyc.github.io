import { Injectable } from "@angular/core";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

@Injectable({
  providedIn: "root"
})
export class SeoService {
  articleContentBlocks: ContentBlockType[] = [
    ContentBlockType.HomepageArticle,
    ContentBlockType.BasicArticleUnit,
    ContentBlockType.BigImageArticleUnit,
    ContentBlockType.DefconArticleUnit,
    ContentBlockType.FeaturedArticle,
    ContentBlockType.HalfWidthImageArticleUnit,
    ContentBlockType.ArticleTitle,
    ContentBlockType.HomepageHighlightArticle,
    ContentBlockType.HalfImageArticleWithoutIntroUnit,
    ContentBlockType.ImageLinkUnit,
    ContentBlockType.ResponsiveBigImageArticle
  ];
  counter = 0;

  reset() {
    this.counter = 0;
  }

  index(contentBlockType: ContentBlockType) {
    return this.articleContentBlocks.includes(contentBlockType)
      ? this.counter++
      : undefined;
  }
}

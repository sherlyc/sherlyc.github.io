import { AccentColor } from "../../../../common/__types__/AccentColor";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { IRawArticle } from "../__types__/IRawArticle";

export const homepageArticleContent = (
  article: IRawArticle
): IHomepageArticleContent => ({
  id: article.id,
  headline: article.indexHeadline,
  title: article.title,
  color: AccentColor.Gray,
  byline: article.byline,
  introText: article.introText,
  headlineFlags: article.headlineFlags,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  image: {
    defcon: article.defconSrc || undefined,
    sixteenByNine: article.sixteenByNineSrc || undefined
  },
  category: {
    name: article.category,
    url: article.categoryUrl
  }
});

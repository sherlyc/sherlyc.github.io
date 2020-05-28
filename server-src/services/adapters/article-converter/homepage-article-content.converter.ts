import { IRawArticle } from "../__types__/IRawArticle";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";

export const homepageArticleContent = (
  article: IRawArticle
): IHomepageArticleContent => ({
  id: article.id,
  headline: article.indexHeadline,
  title: article.title,
  byline: article.byline,
  introText: article.introText,
  headlineFlags: article.headlineFlags,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  identifier: article.identifier,
  image: {
    defcon: article.defconSrc || undefined,
    sixteenByNine: article.sixteenByNineSrc || undefined
  }
});

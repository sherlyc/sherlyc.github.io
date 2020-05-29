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
  image: {
    defcon: article.defconSrc,
    sixteenByNine: article.sixteenByNineSrc
  },
  category: article.category,
  categoryUrl: article.categoryUrl
});

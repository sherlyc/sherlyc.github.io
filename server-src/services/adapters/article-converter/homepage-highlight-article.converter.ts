import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  HomepageHighlightArticleVariation,
  IHomepageHighlightArticle,
  IHomepageHighlightArticleImageConfigs,
  IHomepageHighlightArticleImages
} from "../../../../common/__types__/IHomepageHighlightArticle";
import { IRawArticle } from "../__types__/IRawArticle";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";

function pickImage(
  article: IRawArticle,
  image: IHomepageHighlightArticleImageConfigs
): IHomepageHighlightArticleImages {
  const result: IHomepageHighlightArticleImages = {};
  for (const [device, { variant, aspectRatio }] of Object.entries(image)) {
    let src;
    switch (variant) {
      case JsonFeedImageType.DEFCON:
        src = article.defconSrc;
        break;
      case JsonFeedImageType.PORTRAIT:
        src = article.portraitImageSrc;
        break;
      default:
        src = article.sixteenByNineSrc;
    }
    if (src) {
      result[device as keyof IHomepageHighlightArticleImages] = {
        src,
        aspectRatio
      };
    }
  }
  return result;
}

export const homepageHighlightArticle = (
  article: IRawArticle,
  strapName: string,
  accentColor: AccentColor,
  image: IHomepageHighlightArticleImageConfigs,
  variation: HomepageHighlightArticleVariation,
  showIntroText: boolean
): IHomepageHighlightArticle => ({
  type: ContentBlockType.HomepageHighlightArticle,
  id: article.id,
  headline: article.indexHeadline,
  color: accentColor,
  linkUrl: article.linkUrl,
  headlineFlags: article.headlineFlags,
  lastPublishedTime: article.lastPublishedTime,
  introText: showIntroText ? article.introText : undefined,
  image: pickImage(article, image),
  variation,
  category: {
    name: article.category,
    url: article.categoryUrl
  },
  analytics: {
    strapName,
    title: article.title
  }
});

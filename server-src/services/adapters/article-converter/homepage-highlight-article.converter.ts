import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  HomepageHighlightArticleVariation,
  IHomepageHighlightArticle,
  IHomepageHighlightArticleImage,
  IHomepageHighlightArticleImageDeviceConfig
} from "../../../../common/__types__/IHomepageHighlightArticle";
import { IRawArticle } from "../__types__/IRawArticle";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";

function pickImage(
  article: IRawArticle,
  config: IHomepageHighlightArticleImageDeviceConfig
): IHomepageHighlightArticleImage {
  switch (config.variant) {
    case JsonFeedImageType.DEFCON:
      return { src: article.defconSrc, aspectRatio: config.aspectRatio };
    case JsonFeedImageType.PORTRAIT:
      return { src: article.portraitImageSrc, aspectRatio: config.aspectRatio };
    default:
      return { src: article.sixteenByNineSrc, aspectRatio: config.aspectRatio };
  }
}

export const homepageHighlightArticle = (
  article: IRawArticle,
  strapName: string,
  image: {
    mobile?: IHomepageHighlightArticleImageDeviceConfig;
    tablet?: IHomepageHighlightArticleImageDeviceConfig;
    desktop?: IHomepageHighlightArticleImageDeviceConfig;
  },
  variation: HomepageHighlightArticleVariation,
  showIntroText: boolean
): IHomepageHighlightArticle => ({
  type: ContentBlockType.HomepageHighlightArticle,
  id: article.id,
  headline: article.indexHeadline,
  color: AccentColor.TopStoriesBlue,
  linkUrl: article.linkUrl,
  headlineFlags: article.headlineFlags,
  lastPublishedTime: article.lastPublishedTime,
  introText: showIntroText ? article.introText : undefined,
  image: {
    ...(image.mobile ? { mobile: pickImage(article, image.mobile) } : {}),
    ...(image.tablet ? { tablet: pickImage(article, image.tablet) } : {}),
    ...(image.desktop ? { desktop: pickImage(article, image.desktop) } : {})
  },
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

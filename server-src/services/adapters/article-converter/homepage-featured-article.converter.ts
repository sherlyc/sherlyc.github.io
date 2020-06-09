import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  HomepageFeaturedArticleVariation,
  IHomepageFeaturedArticle,
  IHomepageFeaturedArticleImage,
  IHomepageFeaturedArticleImageDeviceConfig
} from "../../../../common/__types__/IHomepageFeaturedArticle";
import { IRawArticle } from "../__types__/IRawArticle";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";

function pickImage(
  article: IRawArticle,
  config: IHomepageFeaturedArticleImageDeviceConfig
): IHomepageFeaturedArticleImage {
  switch (config.variant) {
    case JsonFeedImageType.DEFCON:
      return { src: article.defconSrc, aspectRatio: config.aspectRatio };
    case JsonFeedImageType.PORTRAIT:
      return { src: article.portraitImageSrc, aspectRatio: config.aspectRatio };
    default:
      return { src: article.sixteenByNineSrc, aspectRatio: config.aspectRatio };
  }
}

export const homepageFeaturedArticle = (
  article: IRawArticle,
  strapName: string,
  image: {
    mobile?: IHomepageFeaturedArticleImageDeviceConfig;
    tablet?: IHomepageFeaturedArticleImageDeviceConfig;
    desktop?: IHomepageFeaturedArticleImageDeviceConfig;
  },
  variation: HomepageFeaturedArticleVariation,
  showIntroText: boolean
): IHomepageFeaturedArticle => ({
  type: ContentBlockType.HomepageFeaturedArticle,
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

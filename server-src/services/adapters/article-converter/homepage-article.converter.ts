import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  IHomepageArticle,
  Orientation
} from "../../../../common/__types__/IHomepageArticle";
import { IRawArticle } from "../__types__/IRawArticle";

export const homepageArticle = (
  article: IRawArticle,
  strapName: string,
  orientation: {
    mobile: Orientation;
    tablet: Orientation;
    desktop: Orientation;
  },
  showIntroText: boolean,
  showImage: boolean
): IHomepageArticle => ({
  type: ContentBlockType.HomepageArticle,
  id: article.id,
  headline: article.indexHeadline,
  color: AccentColor.TopStoriesBlue,
  linkUrl: article.linkUrl,
  headlineFlags: article.headlineFlags,
  lastPublishedTime: article.lastPublishedTime,
  introText: showIntroText ? article.introText : undefined,
  imageSrc:
    showImage && article.sixteenByNineSrc
      ? article.sixteenByNineSrc
      : undefined,
  category: {
    name: article.category,
    url: article.categoryUrl
  },
  analytics: {
    strapName,
    title: article.title
  },
  orientation
});

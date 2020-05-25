import { IRawArticle } from "../__types__/IRawArticle";
import {
  IHomepageArticle,
  Orientation
} from "../../../../common/__types__/IHomepageArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

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
  linkUrl: article.linkUrl,
  headlineFlags: article.headlineFlags,
  lastPublishedTime: article.lastPublishedTime,
  introText: showIntroText ? article.introText : undefined,
  imageSrc: showImage && article.imageSrc ? article.imageSrc : undefined,
  category: article.identifier,
  analytics: {
    strapName,
    title: article.title
  },
  orientation
});

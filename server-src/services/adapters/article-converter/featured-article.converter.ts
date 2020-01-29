import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IFeaturedArticle } from "../../../../common/__types__/IFeaturedArticle";

export const featuredArticle = (
  article: IRawArticle,
  strapName: string,
  textColor: string,
  boxColor: string,
  applyGradient?: boolean
): IFeaturedArticle => ({
  type: ContentBlockType.FeaturedArticle,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.sixteenByNineSrc,
  imageSrcSet: article.imageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags,
  textColor,
  boxColor,
  applyGradient
});
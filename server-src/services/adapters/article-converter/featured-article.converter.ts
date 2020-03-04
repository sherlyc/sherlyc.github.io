import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IFeaturedArticle } from "../../../../common/__types__/IFeaturedArticle";
import { IRawArticle } from "../__types__/IRawArticle";

export const featuredArticle = (
  article: IRawArticle,
  strapName: string,
  textColor: string,
  boxColor: string,
  applyGradient = false,
  pumped = false,
  identifierColor?: string
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
  identifier: article.identifier,
  identifierColor,
  textColor,
  boxColor,
  applyGradient,
  pumped
});

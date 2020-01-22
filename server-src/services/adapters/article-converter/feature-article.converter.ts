import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IFeatureArticle } from "../../../../common/__types__/IFeatureArticle";

export const featureArticle = (
  article: IRawArticle,
  strapName: string,
  textColor: string,
  boxColor: string,
  applyGradient?: boolean
): IFeatureArticle => ({
  type: ContentBlockType.FeatureArticle,
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

import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { ITextBoxArticle } from "../../../../common/__types__/ITextBoxArticle";

export const textBoxArticle = (
  article: IRawArticle,
  strapName: string,
  textColor: string,
  boxColor: string,
  applyGradient?: boolean
): ITextBoxArticle => ({
  type: ContentBlockType.TextBoxArticle,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.imageSrc,
  imageSrcSet: article.imageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags,
  textColor,
  boxColor,
  applyGradient
});

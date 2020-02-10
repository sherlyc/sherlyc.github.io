import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IImageLinkUnit } from "../../../../common/__types__/IImageLinkUnit";

export const imageLinkUnit = (
  article: IRawArticle,
  strapName: string
): IImageLinkUnit => ({
  type: ContentBlockType.ImageLinkUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  imageSrc: article.strapImageSrc,
  imageSrcSet: article.strapImageSrcSet,
  linkUrl: article.linkUrl,
  headlineFlags: article.headlineFlags
});

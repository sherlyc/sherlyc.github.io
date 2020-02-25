import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IImageLinkUnit } from "../../../../common/__types__/IImageLinkUnit";
import { IRawArticle } from "../__types__/IRawArticle";
import { ImageLayoutType } from "../../../../common/__types__/ImageLayoutType";

export const imageLinkUnit = (
  article: IRawArticle,
  strapName: string,
  layout: ImageLayoutType = ImageLayoutType.default
): IImageLinkUnit => ({
  type: ContentBlockType.ImageLinkUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  imageSrc:
    layout === ImageLayoutType.default
      ? article.strapImageSrc
      : article.sixteenByNineSrc,
  imageSrcSet: article.strapImageSrcSet,
  linkUrl: article.linkUrl,
  headlineFlags: article.headlineFlags,
  layout
});

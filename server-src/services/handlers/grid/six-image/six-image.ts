import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ImageLayoutType } from "../../../../../common/__types__/ImageLayoutType";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { imageLinkUnit } from "../../../adapters/article-converter/image-link-unit.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ISixImageGridHandlerInput,
  SixImageGridHandlerPositions
} from "../../__types__/ISixImageGridHandlerInput";
import { ISixImageHandlerInput } from "../../__types__/ISixImageHandlerInput";
import { contentErrorHandler } from "../content-error-handler";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { sourceId, strapName, displayName, color, linkUrl }: ISixImageHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 6, params);
  const gridInput: ISixImageGridHandlerInput = {
    type: HandlerInputType.SixImageGrid,
    content: {
      [SixImageGridHandlerPositions.ModuleTitle]: [
        {
          type: ContentBlockType.ModuleTitle,
          displayName,
          displayNameColor: color,
          linkUrl
        }
      ],
      [SixImageGridHandlerPositions.FirstRowLeft]: [
        contentErrorHandler(
          () =>
            imageLinkUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module,
              color
            ),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.FirstRowMiddle]: [
        contentErrorHandler(
          () =>
            imageLinkUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module,
              color
            ),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.FirstRowRight]: [
        contentErrorHandler(
          () =>
            imageLinkUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module,
              color
            ),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.SecondRowLeft]: [
        contentErrorHandler(
          () =>
            imageLinkUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module,
              color
            ),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.SecondRowMiddle]: [
        contentErrorHandler(
          () =>
            imageLinkUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module,
              color
            ),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.SecondRowRight]: [
        contentErrorHandler(
          () =>
            imageLinkUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module,
              color
            ),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.BigRight]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)]
        }
      ]
    }
  };

  return await handlerRunner(gridInput, params);
}

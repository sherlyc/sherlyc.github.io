import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ISixImageHandlerInput } from "../../__types__/ISixImageHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import {
  ISixImageGridHandlerInput,
  SixImageGridHandlerPositions
} from "../../__types__/ISixImageGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import wrappedLogger from "../../../utils/logger";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { imageLinkUnit } from "../../../adapters/article-converter/image-link-unit.converter";
import { gridBlockErrorHandler } from "../grid-block-error-handler";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { sourceId, strapName, displayName, displayNameColor }: ISixImageHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 6, params);
  const articlesLength = articles.length;
  try {
    const gridInput: ISixImageGridHandlerInput = {
      type: HandlerInputType.SixImageGrid,
      content: {
        [SixImageGridHandlerPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName,
            displayNameColor
          }
        ],
        [SixImageGridHandlerPositions.FirstRowLeft]: [
          await gridBlockErrorHandler(
            () => imageLinkUnit(articles.shift() as IRawArticle, strapName),
            HandlerInputType.SixImage,
            SixImageGridHandlerPositions.FirstRowLeft,
            params
          )
        ],
        [SixImageGridHandlerPositions.FirstRowMiddle]: [
          await gridBlockErrorHandler(
            () => imageLinkUnit(articles.shift() as IRawArticle, strapName),
            HandlerInputType.SixImage,
            SixImageGridHandlerPositions.FirstRowMiddle,
            params
          )
        ],
        [SixImageGridHandlerPositions.FirstRowRight]: [
          await gridBlockErrorHandler(
            () => imageLinkUnit(articles.shift() as IRawArticle, strapName),
            HandlerInputType.SixImage,
            SixImageGridHandlerPositions.FirstRowRight,
            params
          )
        ],
        [SixImageGridHandlerPositions.SecondRowLeft]: [basicAdUnit(strapName)],
        [SixImageGridHandlerPositions.SecondRowMiddle]: [
          await gridBlockErrorHandler(
            () => imageLinkUnit(articles.shift() as IRawArticle, strapName),
            HandlerInputType.SixImage,
            SixImageGridHandlerPositions.SecondRowMiddle,
            params
          )
        ],
        [SixImageGridHandlerPositions.SecondRowRight]: [
          await gridBlockErrorHandler(
            () => imageLinkUnit(articles.shift() as IRawArticle, strapName),
            HandlerInputType.SixImage,
            SixImageGridHandlerPositions.SecondRowRight,
            params
          )
        ],
        [SixImageGridHandlerPositions.BigRight]: [basicAdUnit(strapName)]
      }
    };

    return await handlerRunner(gridInput, params);
  } catch (error) {
    wrappedLogger.error(
      params.apiRequestId,
      `Six Image handler error: Potentially insufficient number of articles: ${articlesLength}. Strap name: ${sourceId}|${strapName}`,
      error
    );
    throw error;
  }
}

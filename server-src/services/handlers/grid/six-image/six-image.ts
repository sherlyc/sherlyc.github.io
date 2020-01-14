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
          imageLinkUnit(articles.shift() as IRawArticle, strapName)
        ],
        [SixImageGridHandlerPositions.FirstRowMiddle]: [
          imageLinkUnit(articles.shift() as IRawArticle, strapName)
        ],
        [SixImageGridHandlerPositions.FirstRowRight]: [
          imageLinkUnit(articles.shift() as IRawArticle, strapName)
        ],
        [SixImageGridHandlerPositions.SecondRowLeft]: [basicAdUnit(strapName)],
        [SixImageGridHandlerPositions.SecondRowMiddle]: [
          imageLinkUnit(articles.shift() as IRawArticle, strapName)
        ],
        [SixImageGridHandlerPositions.SecondRowRight]: [
          imageLinkUnit(articles.shift() as IRawArticle, strapName)
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

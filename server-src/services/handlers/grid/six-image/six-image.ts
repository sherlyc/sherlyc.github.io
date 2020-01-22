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
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { imageLinkUnit } from "../../../adapters/article-converter/image-link-unit.converter";
import { contentErrorHandler } from "../content-error-handler";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { sourceId, strapName, displayName, displayNameColor }: ISixImageHandlerInput,
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
          displayNameColor
        }
      ],
      [SixImageGridHandlerPositions.FirstRowLeft]: [
        await contentErrorHandler(
          () => imageLinkUnit(articles.shift() as IRawArticle, strapName),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.FirstRowMiddle]: [
        await contentErrorHandler(
          () => imageLinkUnit(articles.shift() as IRawArticle, strapName),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.FirstRowRight]: [
        await contentErrorHandler(
          () => imageLinkUnit(articles.shift() as IRawArticle, strapName),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.SecondRowLeft]: [basicAdUnit(strapName)],
      [SixImageGridHandlerPositions.SecondRowMiddle]: [
        await contentErrorHandler(
          () => imageLinkUnit(articles.shift() as IRawArticle, strapName),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.SecondRowRight]: [
        await contentErrorHandler(
          () => imageLinkUnit(articles.shift() as IRawArticle, strapName),
          HandlerInputType.SixImage,
          sourceId,
          params
        )
      ],
      [SixImageGridHandlerPositions.BigRight]: [basicAdUnit(strapName)]
    }
  };

  return await handlerRunner(gridInput, params);
}

import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ILargeLeadSixGridHandlerInput,
  LargeLeadSixGridPositions
} from "../../__types__/ILargeLeadSixGridHandlerInput";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { ILargeLeadSixHandlerInput } from "../../__types__/ILargeLeadSixHandlerInput";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { gridBlockErrorHandler } from "../grid-block-error-handler";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    displayName,
    displayNameColor
  }: ILargeLeadSixHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const totalArticles = 6;
  const articles = await getRawArticles(sourceId, totalArticles, params);

  const leftContent = await gridBlockErrorHandler(
    () => bigImageArticleUnit(articles.shift() as IRawArticle, strapName),
    HandlerInputType.LargeLeadSix,
    params
  );
  const listGridContent = articles.map((article) =>
    basicArticleTitleUnit(article, strapName)
  );

  const middleContent = await gridBlockErrorHandler(
    () =>
      handlerRunner(
        {
          type: HandlerInputType.ListGrid,
          content: listGridContent
        },
        params
      ),
    HandlerInputType.LargeLeadSix,
    params
  );
  const largeLeadSixGridHandlerInput: ILargeLeadSixGridHandlerInput = {
    type: HandlerInputType.LargeLeadSixGrid,
    content: {
      [LargeLeadSixGridPositions.ModuleTitle]: [
        {
          type: ContentBlockType.ModuleTitle,
          displayName,
          displayNameColor
        }
      ],
      [LargeLeadSixGridPositions.Left]: [leftContent],
      [LargeLeadSixGridPositions.Middle]: middleContent,
      [LargeLeadSixGridPositions.Right]: [basicAdUnit(strapName)]
    }
  };

  return await handlerRunner(largeLeadSixGridHandlerInput, params);
}

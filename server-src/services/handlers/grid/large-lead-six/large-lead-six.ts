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

  if (articles.length < totalArticles) {
    const errorMsg = `Large Lead Six handler error: Insufficient number of articles: ${articles.length}. Strap name: ${sourceId}|${strapName}`;
    throw new Error(errorMsg);
  }

  const leftContent = bigImageArticleUnit(
    articles.shift() as IRawArticle,
    strapName
  );
  const listGridContent = articles.map((article) =>
    basicArticleTitleUnit(article, strapName)
  );

  const listGrid = await handlerRunner(
    {
      type: HandlerInputType.ListGrid,
      content: listGridContent
    },
    params
  );

  const largeLeadSixGridHandlerInput: ILargeLeadSixGridHandlerInput = {
    type: HandlerInputType.LargeLeadSixGrid,
    content: {
      [LargeLeadSixGridPositions.Left]: [leftContent],
      [LargeLeadSixGridPositions.Middle]: listGrid,
      [LargeLeadSixGridPositions.Right]: [basicAdUnit(strapName)]
    }
  };

  return await handlerRunner(largeLeadSixGridHandlerInput, params);
}

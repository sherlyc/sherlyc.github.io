import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { BigImageArticleUnitLayout } from "../../../../../common/__types__/IBigImageArticleUnit";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ILargeLeadSixGridHandlerInput,
  LargeLeadSixGridPositions
} from "../../__types__/ILargeLeadSixGridHandlerInput";
import { ILargeLeadSixHandlerInput } from "../../__types__/ILargeLeadSixHandlerInput";
import { contentErrorHandler } from "../content-error-handler";
import { handlerRunnerFunction } from "../../runner";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    displayName,
    displayNameColor,
    linkUrl
  }: ILargeLeadSixHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const totalArticles = 6;
  const articles = await getRawArticles(sourceId, totalArticles, params);

  const leftContent = contentErrorHandler(
    () =>
      bigImageArticleUnit(
        articles.shift() as IRawArticle,
        strapName,
        BigImageArticleUnitLayout.module
      ),
    HandlerInputType.LargeLeadSix,
    sourceId,
    params
  );
  const listGridContent = articles.map((article) =>
    basicArticleTitleUnit(article, strapName)
  );

  const middleContent = await handlerRunner(
    {
      type: HandlerInputType.ListGrid,
      content: listGridContent
    },
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
      [LargeLeadSixGridPositions.Right]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)]
        }
      ]
    }
  };

  return await handlerRunner(largeLeadSixGridHandlerInput, params);
}

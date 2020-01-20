import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { INewsSixHandlerInput } from "../../__types__/INewsSixHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { NewsSixGridPositions } from "../../__types__/INewsSixGridHandlerInput";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { gridBlockErrorHandler } from "../grid-block-error-handler";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { displayName, displayNameColor, sourceId, strapName }: INewsSixHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 6, params);

  const content: { [key in NewsSixGridPositions]: IContentBlock[] } = {
    [NewsSixGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleTitle,
        displayName,
        displayNameColor
      }
    ],
    [NewsSixGridPositions.BigTopLeft]: [
      await gridBlockErrorHandler(
        () => bigImageArticleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.NewsSix,
        NewsSixGridPositions.BigTopLeft,
        params
      )
    ],
    [NewsSixGridPositions.SmallTopRight]: [
      await gridBlockErrorHandler(
        () => bigImageArticleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.NewsSix,
        NewsSixGridPositions.SmallTopRight,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomFirst]: [
      await gridBlockErrorHandler(
        () => bigImageArticleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.NewsSix,
        NewsSixGridPositions.SmallBottomFirst,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomSecond]: [
      await gridBlockErrorHandler(
        () => bigImageArticleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.NewsSix,
        NewsSixGridPositions.SmallBottomSecond,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomThird]: [
      await gridBlockErrorHandler(
        () => bigImageArticleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.NewsSix,
        NewsSixGridPositions.SmallBottomThird,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomFourth]: [
      await gridBlockErrorHandler(
        () => bigImageArticleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.NewsSix,
        NewsSixGridPositions.SmallBottomFourth,
        params
      )
    ]
  };

  return await handlerRunner(
    {
      type: HandlerInputType.NewsSixGrid,
      content
    },
    params
  );
}

import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { BigImageArticleUnitLayout } from "../../../../../common/__types__/IBigImageArticleUnit";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { NewsSixGridPositions } from "../../__types__/INewsSixGridHandlerInput";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { contentErrorHandler } from "../content-error-handler";
import { responsiveBigImageArticleUnit } from "../../../adapters/article-converter/responsive-big-image-article.converter";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { INewsSixHandlerInput } from "../../__types__/INewsSixHandlerInput";
import { handlerRunnerFunction } from "../../runner";

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
      await contentErrorHandler(
        () =>
          responsiveBigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName
          ),
        HandlerInputType.NewsSix,
        sourceId,
        params
      )
    ],
    [NewsSixGridPositions.SmallTopRight]: [
      await contentErrorHandler(
        () =>
          bigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            BigImageArticleUnitLayout.module
          ),
        HandlerInputType.NewsSix,
        sourceId,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomFirst]: [
      await contentErrorHandler(
        () => basicArticleTitleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.NewsSix,
        sourceId,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomSecond]: [
      await contentErrorHandler(
        () => basicArticleTitleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.NewsSix,
        sourceId,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomThird]: [
      await contentErrorHandler(
        () => basicArticleTitleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.NewsSix,
        sourceId,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomFourth]: [
      await contentErrorHandler(
        () => basicArticleTitleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.NewsSix,
        sourceId,
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

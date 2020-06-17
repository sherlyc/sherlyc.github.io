import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ImageLayoutType } from "../../../../../common/__types__/ImageLayoutType";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { responsiveBigImageArticleUnit } from "../../../adapters/article-converter/responsive-big-image-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { NewsSixGridPositions } from "../../__types__/INewsSixGridHandlerInput";
import { INewsSixHandlerInput } from "../../__types__/INewsSixHandlerInput";
import { contentErrorHandler } from "../content-error-handler";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { displayName, color, linkUrl, sourceId, strapName }: INewsSixHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 6, params);

  const content: { [key in NewsSixGridPositions]: IContentBlock[] } = {
    [NewsSixGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleTitle,
        displayName,
        displayNameColor: color,
        linkUrl
      }
    ],
    [NewsSixGridPositions.BigTopLeft]: [
      contentErrorHandler(
        () =>
          responsiveBigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
        HandlerInputType.NewsSix,
        sourceId,
        params
      )
    ],
    [NewsSixGridPositions.SmallTopRight]: [
      contentErrorHandler(
        () =>
          bigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            ImageLayoutType.module,
            false,
            color
          ),
        HandlerInputType.NewsSix,
        sourceId,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomFirst]: [
      contentErrorHandler(
        () =>
          basicArticleTitleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
        HandlerInputType.NewsSix,
        sourceId,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomSecond]: [
      contentErrorHandler(
        () =>
          basicArticleTitleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
        HandlerInputType.NewsSix,
        sourceId,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomThird]: [
      contentErrorHandler(
        () =>
          basicArticleTitleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
        HandlerInputType.NewsSix,
        sourceId,
        params
      )
    ],
    [NewsSixGridPositions.SmallBottomFourth]: [
      contentErrorHandler(
        () =>
          basicArticleTitleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
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

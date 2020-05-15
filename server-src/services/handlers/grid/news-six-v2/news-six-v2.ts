import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { featuredArticle } from "../../../adapters/article-converter/featured-article.converter";
import { responsiveBigImageArticleUnit } from "../../../adapters/article-converter/responsive-big-image-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { NewsSixV2GridPositions } from "../../__types__/INewsSixGridV2HandlerInput";
import { INewsSixV2HandlerInput } from "../../__types__/INewsSixV2HandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { contentErrorHandler } from "../content-error-handler";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { displayName, color, linkUrl, sourceId, strapName }: INewsSixV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 6, params);

  const content: { [key in NewsSixV2GridPositions]: IContentBlock[] } = {
    [NewsSixV2GridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleTitle,
        displayName,
        displayNameColor: color,
        linkUrl
      }
    ],
    [NewsSixV2GridPositions.One]: [
      contentErrorHandler(
        () =>
          featuredArticle(
            articles.shift() as IRawArticle,
            strapName,
            "#333",
            "#f2f2f2",
            false,
            false,
            color
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ],
    [NewsSixV2GridPositions.Two]: [
      contentErrorHandler(
        () =>
          basicArticleTitleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ],
    [NewsSixV2GridPositions.Three]: [
      contentErrorHandler(
        () =>
          basicArticleTitleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ],
    [NewsSixV2GridPositions.Four]: [
      contentErrorHandler(
        () =>
          featuredArticle(
            articles.shift() as IRawArticle,
            strapName,
            "#333",
            "#f2f2f2",
            false,
            false,
            color
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ],
    [NewsSixV2GridPositions.Five]: [
      contentErrorHandler(
        () =>
          responsiveBigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ],
    [NewsSixV2GridPositions.Six]: [
      contentErrorHandler(
        () =>
          responsiveBigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ]
  };

  return await handlerRunner(
    {
      type: HandlerInputType.NewsSixV2Grid,
      content
    },
    params
  );
}

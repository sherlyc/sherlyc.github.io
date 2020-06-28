import { AspectRatio } from "../../../../../common/AspectRatio";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { HomepageHighlightArticleVariation } from "../../../../../common/__types__/IHomepageHighlightArticle";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { homepageHighlightArticle } from "../../../adapters/article-converter/homepage-highlight-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { JsonFeedImageType } from "../../../adapters/__types__/JsonFeedImageType";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { NewsSixV2GridPositions } from "../../__types__/INewsSixGridV2HandlerInput";
import { INewsSixV2HandlerInput } from "../../__types__/INewsSixV2HandlerInput";
import { contentErrorHandler } from "../content-error-handler";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { displayName, color, linkUrl, sourceId, strapName }: INewsSixV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 6, params);

  const content: { [key in NewsSixV2GridPositions]: IContentBlock[] } = {
    [NewsSixV2GridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleHeader,
        title: displayName,
        url: linkUrl,
        color
      }
    ],
    [NewsSixV2GridPositions.One]: [
      contentErrorHandler(
        () =>
          homepageHighlightArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: {
                variant: JsonFeedImageType.LANDSCAPE_SIXTEEN_BY_NINE,
                aspectRatio: AspectRatio.SixteenByNine
              }
            },
            HomepageHighlightArticleVariation.Featured,
            true,
            false
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ],
    [NewsSixV2GridPositions.Two]: [
      contentErrorHandler(
        () =>
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: Orientation.Landscape,
              tablet: Orientation.Landscape,
              desktop: Orientation.Landscape
            },
            true,
            false
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ],
    [NewsSixV2GridPositions.Three]: [
      contentErrorHandler(
        () =>
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: Orientation.Landscape,
              tablet: Orientation.Landscape,
              desktop: Orientation.Landscape
            },
            true,
            false
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ],
    [NewsSixV2GridPositions.Four]: [
      contentErrorHandler(
        () =>
          homepageHighlightArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: {
                variant: JsonFeedImageType.LANDSCAPE_SIXTEEN_BY_NINE,
                aspectRatio: AspectRatio.SixteenByNine
              }
            },
            HomepageHighlightArticleVariation.Featured,
            true,
            false
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ],
    [NewsSixV2GridPositions.Five]: [
      contentErrorHandler(
        () =>
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: Orientation.Portrait,
              tablet: Orientation.Landscape,
              desktop: Orientation.Landscape
            },
            true,
            true
          ),
        HandlerInputType.NewsSixV2,
        sourceId,
        params
      )
    ],
    [NewsSixV2GridPositions.Six]: [
      contentErrorHandler(
        () =>
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: Orientation.Portrait,
              tablet: Orientation.Landscape,
              desktop: Orientation.Landscape
            },
            true,
            true
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

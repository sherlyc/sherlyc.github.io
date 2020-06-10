import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { featuredArticle } from "../../../adapters/article-converter/featured-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { NewsSixV2GridPositions } from "../../__types__/INewsSixGridV2HandlerInput";
import { INewsSixV2HandlerInput } from "../../__types__/INewsSixV2HandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { contentErrorHandler } from "../content-error-handler";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { AccentColor } from "../../../../../common/__types__/AccentColor";

export default async function(
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
        color: AccentColor.TopStoriesBlue,
        url: linkUrl
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
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
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
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            {
              mobile: Orientation.Landscape,
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
            {
              mobile: Orientation.Landscape,
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

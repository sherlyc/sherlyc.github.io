import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { AspectRatio } from "../../../../../common/AspectRatio";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { BiggieSmallsV2GridPositions } from "../../__types__/IBiggieSmallsV2GridHandlerInput";
import { IBiggieSmallsV2HandlerInput } from "../../__types__/IBiggieSmallsV2HandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { contentErrorHandler } from "../content-error-handler";
import { homepageHighlightArticle } from "../../../adapters/article-converter/homepage-highlight-article.converter";
import { JsonFeedImageType } from "../../../adapters/__types__/JsonFeedImageType";
import { HomepageHighlightArticleVariation } from "../../../../../common/__types__/IHomepageHighlightArticle";

export default async function (
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    color,
    linkUrl,
    sourceId,
    strapName
  }: IBiggieSmallsV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 7, params);

  const content: { [key in BiggieSmallsV2GridPositions]: IContentBlock[] } = {
    [BiggieSmallsV2GridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleHeader,
        title: displayName,
        url: linkUrl,
        color
      }
    ],
    [BiggieSmallsV2GridPositions.Highlight]: [
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
            true
          ),
        HandlerInputType.BiggieSmallsV2,
        sourceId,
        params
      )
    ],
    [BiggieSmallsV2GridPositions.RightOne]: [
      contentErrorHandler(
        () =>
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            true,
            true
          ),
        HandlerInputType.BiggieSmallsV2,
        sourceId,
        params
      )
    ],
    [BiggieSmallsV2GridPositions.LeftOne]: [
      contentErrorHandler(
        () =>
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            true,
            true
          ),
        HandlerInputType.BiggieSmallsV2,
        sourceId,
        params
      )
    ],
    [BiggieSmallsV2GridPositions.LeftTwo]: [basicAdUnit(strapName)],
    [BiggieSmallsV2GridPositions.RightTwo]: [
      contentErrorHandler(
        () =>
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            true,
            false
          ),
        HandlerInputType.BiggieSmallsV2,
        sourceId,
        params
      )
    ],
    [BiggieSmallsV2GridPositions.RightThree]: [
      contentErrorHandler(
        () =>
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            false,
            false
          ),
        HandlerInputType.BiggieSmallsV2,
        sourceId,
        params
      )
    ],
    [BiggieSmallsV2GridPositions.RightFour]: [
      contentErrorHandler(
        () =>
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            false,
            false
          ),
        HandlerInputType.BiggieSmallsV2,
        sourceId,
        params
      )
    ],
    [BiggieSmallsV2GridPositions.RightFive]: [
      contentErrorHandler(
        () =>
          homepageArticle(
            articles.shift() as IRawArticle,
            strapName,
            color,
            {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            false,
            false
          ),
        HandlerInputType.BiggieSmallsV2,
        sourceId,
        params
      )
    ],
    [BiggieSmallsV2GridPositions.BannerAd]: [
      {
        type: ContentBlockType.StickyContainer,
        items: [basicAdUnit(strapName)]
      }
    ]
  };

  return await handlerRunner(
    {
      type: HandlerInputType.BiggieSmallsV2Grid,
      content
    },
    params
  );
}

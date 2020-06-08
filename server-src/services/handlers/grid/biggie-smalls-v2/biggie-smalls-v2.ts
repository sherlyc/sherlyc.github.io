import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { BiggieSmallsV2GridPositions } from "../../__types__/IBiggieSmallsV2GridHandlerInput";
import { IBiggieSmallsV2HandlerInput } from "../../__types__/IBiggieSmallsV2HandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { contentErrorHandler } from "../content-error-handler";
import { featuredArticle } from "../../../adapters/article-converter/featured-article.converter";
import { AspectRatio } from "../../../../../common/AspectRatio";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";

export const ARTICLE_CAPACITY_BIGGIE_SMALLS = 7;

export default async function(
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
  const articles = await getRawArticles(
    sourceId,
    ARTICLE_CAPACITY_BIGGIE_SMALLS,
    params
  );

  const content: { [key in BiggieSmallsV2GridPositions]: IContentBlock[] } = {
    [BiggieSmallsV2GridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleTitle,
        displayName,
        displayNameColor: color,
        linkUrl
      }
    ],
    [BiggieSmallsV2GridPositions.Highlight]: [
      contentErrorHandler(
        () =>
          featuredArticle(
            articles.shift() as IRawArticle,
            strapName,
            "black",
            "#f1f1f1c7",
            false,
            true,
            "",
            AspectRatio.SixteenByNine
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

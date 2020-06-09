import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { HomepageHighlightArticleVariation } from "../../../../../common/__types__/IHomepageHighlightArticle";
import { AspectRatio } from "../../../../../common/AspectRatio";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { JsonFeedImageType } from "../../../adapters/__types__/JsonFeedImageType";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { homepageHighlightArticle } from "../../../adapters/article-converter/homepage-highlight-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ITopStoriesV2GridHandlerInput,
  TopStoriesV2GridPositions
} from "../../__types__/ITopStoriesV2GridHandlerInput";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { contentErrorHandler } from "../content-error-handler";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    strapName,
    color,
    midInsertContent,
    lowerRightContent
  }: ITopStoriesV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(Strap.TopStories, 10, params);
  const midInsertContentBlocks = await handlerRunner(midInsertContent, params);
  const lowerRightContentBlocks = await handlerRunner(
    lowerRightContent,
    params
  );

  const gridInput: ITopStoriesV2GridHandlerInput = {
    type: HandlerInputType.TopStoriesV2Grid,
    content: {
      [TopStoriesV2GridPositions.RightHighlight]: [
        contentErrorHandler(
          () =>
            homepageHighlightArticle(
              articles.shift() as IRawArticle,
              strapName,
              {
                mobile: {
                  variant: JsonFeedImageType.PORTRAIT,
                  aspectRatio: AspectRatio.OneByOne
                }
              },
              HomepageHighlightArticleVariation.Featured,
              true
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.LeftHighlight]: [
        contentErrorHandler(
          () =>
            homepageHighlightArticle(
              articles.shift() as IRawArticle,
              strapName,
              {
                mobile: {
                  variant: JsonFeedImageType.THUMBNAIL_SIXTEEN_BY_NINE,
                  aspectRatio: AspectRatio.SixteenByNine
                }
              },
              HomepageHighlightArticleVariation.Lead,
              true
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.BannerAd]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)]
        }
      ],
      [TopStoriesV2GridPositions.LeftOne]: [
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.LeftTwo]: [
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.LeftThree]: [
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.LeftFour]: [basicAdUnit(strapName)],
      [TopStoriesV2GridPositions.RightOne]: [
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
              false,
              true
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.RightTwo]: [
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
              false,
              true
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.RightThree]: [
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.RightFour]: [
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.RightFive]: [
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.MidInsert]: midInsertContentBlocks,
      [TopStoriesV2GridPositions.LowerRight]: lowerRightContentBlocks
    }
  };

  return handlerRunner(gridInput, params);
}

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
  ITopStoriesV2DefaultGridHandlerInput,
  TopStoriesV2DefaultGridPositions,
} from "../../__types__/ITopStoriesV2DefaultGridHandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { contentErrorHandler } from "../content-error-handler";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";

function defaultGrid(
  { strapName, color}: ITopStoriesV2HandlerInput,
  articles: IRawArticle[],
  midInsertContentBlocks: IContentBlock[],
  lowerRightContentBlocks: IContentBlock[],
  params: IParams
): ITopStoriesV2DefaultGridHandlerInput {
  return {
    type: HandlerInputType.TopStoriesV2DefaultGrid,
    content: {
      [TopStoriesV2DefaultGridPositions.RightHighlight]: [
        contentErrorHandler(
          () =>
            homepageHighlightArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: {
                  variant: JsonFeedImageType.PORTRAIT,
                  aspectRatio: AspectRatio.OneByOne,
                },
              },
              HomepageHighlightArticleVariation.Featured,
              true
            ),
          HandlerInputType.TopStoriesV2Default,
          Strap.TopStories,
          params
        ),
      ],
      [TopStoriesV2DefaultGridPositions.LeftHighlight]: [
        contentErrorHandler(
          () =>
            homepageHighlightArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: {
                  variant: JsonFeedImageType.THUMBNAIL_SIXTEEN_BY_NINE,
                  aspectRatio: AspectRatio.SixteenByNine,
                },
              },
              HomepageHighlightArticleVariation.Lead,
              true
            ),
          HandlerInputType.TopStoriesV2Default,
          Strap.TopStories,
          params
        ),
      ],
      [TopStoriesV2DefaultGridPositions.BannerAd]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)],
        },
      ],
      [TopStoriesV2DefaultGridPositions.LeftOne]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              true,
              true
            ),
          HandlerInputType.TopStoriesV2Default,
          Strap.TopStories,
          params
        ),
      ],
      [TopStoriesV2DefaultGridPositions.LeftTwo]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              true,
              true
            ),
          HandlerInputType.TopStoriesV2Default,
          Strap.TopStories,
          params
        ),
      ],
      [TopStoriesV2DefaultGridPositions.LeftThree]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              true,
              true
            ),
          HandlerInputType.TopStoriesV2Default,
          Strap.TopStories,
          params
        ),
      ],
      [TopStoriesV2DefaultGridPositions.LeftFour]: [basicAdUnit(strapName)],
      [TopStoriesV2DefaultGridPositions.RightOne]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Landscape,
                tablet: Orientation.Landscape,
                desktop: Orientation.Landscape,
              },
              false,
              true
            ),
          HandlerInputType.TopStoriesV2Default,
          Strap.TopStories,
          params
        ),
      ],
      [TopStoriesV2DefaultGridPositions.RightTwo]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Landscape,
                tablet: Orientation.Landscape,
                desktop: Orientation.Landscape,
              },
              false,
              true
            ),
          HandlerInputType.TopStoriesV2Default,
          Strap.TopStories,
          params
        ),
      ],
      [TopStoriesV2DefaultGridPositions.RightThree]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              true,
              false
            ),
          HandlerInputType.TopStoriesV2Default,
          Strap.TopStories,
          params
        ),
      ],
      [TopStoriesV2DefaultGridPositions.RightFour]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Landscape,
                tablet: Orientation.Landscape,
                desktop: Orientation.Landscape,
              },
              true,
              false
            ),
          HandlerInputType.TopStoriesV2Default,
          Strap.TopStories,
          params
        ),
      ],
      [TopStoriesV2DefaultGridPositions.RightFive]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Landscape,
                tablet: Orientation.Landscape,
                desktop: Orientation.Landscape,
              },
              true,
              false
            ),
          HandlerInputType.TopStoriesV2Default,
          Strap.TopStories,
          params
        ),
      ],
      [TopStoriesV2DefaultGridPositions.MidInsert]: midInsertContentBlocks,
      [TopStoriesV2DefaultGridPositions.LowerRight]: lowerRightContentBlocks,
    },
  };
}

export default async function (
  handlerRunner: handlerRunnerFunction,
  input: ITopStoriesV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(Strap.TopStories, 10, params);
  const midInsertContentBlocks = await handlerRunner(input.midInsertContent, params);
  const lowerRightContentBlocks = await handlerRunner(
    input.lowerRightContent,
    params
  );

  return handlerRunner(defaultGrid(input, articles, midInsertContentBlocks, lowerRightContentBlocks, params), params);
}

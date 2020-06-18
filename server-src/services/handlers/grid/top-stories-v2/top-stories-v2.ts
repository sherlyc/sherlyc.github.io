import { AspectRatio } from "../../../../../common/AspectRatio";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { HomepageHighlightArticleVariation } from "../../../../../common/__types__/IHomepageHighlightArticle";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { homepageHighlightArticle } from "../../../adapters/article-converter/homepage-highlight-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { JsonFeedImageType } from "../../../adapters/__types__/JsonFeedImageType";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ITopStoriesV2DefaultGridHandlerInput,
  TopStoriesV2DefaultGridPositions
} from "../../__types__/ITopStoriesV2DefaultGridHandlerInput";
import {
  ITopStoriesV2DefconGridHandlerInput,
  TopStoriesV2DefconGridPositions
} from "../../__types__/ITopStoriesV2DefconGridHandlerInput";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";
import { contentErrorHandler } from "../content-error-handler";

function defaultGrid(
  { strapName, color }: ITopStoriesV2HandlerInput,
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
      [TopStoriesV2DefaultGridPositions.BannerAd]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)]
        }
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
      [TopStoriesV2DefaultGridPositions.MidInsert]: midInsertContentBlocks,
      [TopStoriesV2DefaultGridPositions.LowerRight]: lowerRightContentBlocks
    }
  };
}

function defconGrid(
  { strapName, color }: ITopStoriesV2HandlerInput,
  defconArticles: IRawArticle[],
  topArticles: IRawArticle[],
  midInsertContentBlocks: IContentBlock[],
  lowerRightContentBlocks: IContentBlock[],
  params: IParams
): ITopStoriesV2DefconGridHandlerInput {
  return {
    type: HandlerInputType.TopStoriesV2DefconGrid,
    content: {
      [TopStoriesV2DefconGridPositions.Defcon]: [
        contentErrorHandler(
          () =>
            homepageHighlightArticle(
              defconArticles.shift() as IRawArticle,
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2DefconGridPositions.BannerAd]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)]
        }
      ],
      [TopStoriesV2DefconGridPositions.LeftOne]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              topArticles.shift() as IRawArticle,
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2DefconGridPositions.LeftTwo]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              topArticles.shift() as IRawArticle,
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2DefconGridPositions.LeftThree]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              topArticles.shift() as IRawArticle,
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2DefconGridPositions.LeftFour]: [basicAdUnit(strapName)],
      [TopStoriesV2DefconGridPositions.RightOne]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              topArticles.shift() as IRawArticle,
              strapName,
              color,
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
      [TopStoriesV2DefconGridPositions.RightTwo]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              topArticles.shift() as IRawArticle,
              strapName,
              color,
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
      [TopStoriesV2DefconGridPositions.RightThree]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              topArticles.shift() as IRawArticle,
              strapName,
              color,
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
      [TopStoriesV2DefconGridPositions.RightFour]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              topArticles.shift() as IRawArticle,
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2DefconGridPositions.RightFive]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              topArticles.shift() as IRawArticle,
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2DefconGridPositions.RightSix]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              topArticles.shift() as IRawArticle,
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
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2DefconGridPositions.MidInsert]: midInsertContentBlocks,
      [TopStoriesV2DefconGridPositions.LowerRight]: lowerRightContentBlocks
    }
  };
}

export default async function (
  handlerRunner: handlerRunnerFunction,
  input: ITopStoriesV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(Strap.TopStories, 10, params);
  const midInsertContentBlocks = await handlerRunner(
    input.midInsertContent,
    params
  );
  const lowerRightContentBlocks = await handlerRunner(
    input.lowerRightContent,
    params
  );

  return handlerRunner(
    defaultGrid(
      input,
      articles,
      midInsertContentBlocks,
      lowerRightContentBlocks,
      params
    ),
    params
  );
}

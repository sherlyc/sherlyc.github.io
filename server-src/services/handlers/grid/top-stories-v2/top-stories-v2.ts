import { AspectRatio } from "../../../../../common/AspectRatio";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { HomepageHighlightArticleVariation } from "../../../../../common/__types__/IHomepageHighlightArticle";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { homepageArticleContent } from "../../../adapters/article-converter/homepage-article-content.converter";
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
      [TopStoriesV2DefaultGridPositions.TopOne]: [
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
      [TopStoriesV2DefaultGridPositions.TopTwo]: [
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
      [TopStoriesV2DefaultGridPositions.TopThree]: [
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
      [TopStoriesV2DefaultGridPositions.TopFour]: [
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
      [TopStoriesV2DefaultGridPositions.BottomOne]: [
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
      [TopStoriesV2DefaultGridPositions.BottomTwo]: [basicAdUnit(strapName)],
      [TopStoriesV2DefaultGridPositions.BottomThree]: [
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
      [TopStoriesV2DefaultGridPositions.BottomFour]: [
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
      [TopStoriesV2DefaultGridPositions.BottomFive]: [
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
        {
          type: ContentBlockType.Defcon,
          articles: defconArticles.map(homepageArticleContent),
          strapName,
          color
        }
      ],
      [TopStoriesV2DefconGridPositions.BannerAd]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)]
        }
      ],
      [TopStoriesV2DefconGridPositions.TopOne]: [
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
      [TopStoriesV2DefconGridPositions.TopTwo]: [
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
      [TopStoriesV2DefconGridPositions.TopThree]: [
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
      [TopStoriesV2DefconGridPositions.TopFour]: [
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
      [TopStoriesV2DefconGridPositions.TopFive]: [
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
      [TopStoriesV2DefconGridPositions.BottomOne]: [
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
      [TopStoriesV2DefconGridPositions.BottomTwo]: [basicAdUnit(strapName)],
      [TopStoriesV2DefconGridPositions.BottomThree]: [
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
              false
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2DefconGridPositions.BottomFour]: [
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
              false
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2DefconGridPositions.BottomFive]: [
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

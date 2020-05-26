import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ImageLayoutType } from "../../../../../common/__types__/ImageLayoutType";
import { AspectRatio } from "../../../../../common/AspectRatio";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { featuredArticle } from "../../../adapters/article-converter/featured-article.converter";
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
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { strapName, color }: ITopStoriesV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(Strap.TopStories, 9, params);

  const gridInput: ITopStoriesV2GridHandlerInput = {
    type: HandlerInputType.TopStoriesV2Grid,
    content: {
      [TopStoriesV2GridPositions.LeftHighlight]: [
        contentErrorHandler(
          () =>
            bigImageArticleUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module,
              true
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.RightHighlight]: [
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
              AspectRatio.OneByOne
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
              false,
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
      ]
    }
  };

  return await handlerRunner(gridInput, params);
}

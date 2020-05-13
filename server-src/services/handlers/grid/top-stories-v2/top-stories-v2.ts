import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import {
  ITopStoriesV2GridHandlerInput,
  TopStoriesV2GridPositions
} from "../../__types__/ITopStoriesV2GridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { contentErrorHandler } from "../content-error-handler";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { ImageLayoutType } from "../../../../../common/__types__/ImageLayoutType";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { featuredArticle } from "../../../adapters/article-converter/featured-article.converter";
import { halfImageArticleWithoutIntroUnit } from "../../../adapters/article-converter/half-image-article-without-intro-unit.converter";
import { imageLinkUnit } from "../../../adapters/article-converter/image-link-unit.converter";

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
              "#faf9f2",
              false,
              true,
              "",
              "1:1"
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
            bigImageArticleUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.LeftTwo]: [
        contentErrorHandler(
          () =>
            bigImageArticleUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.LeftThree]: [
        contentErrorHandler(
          () =>
            imageLinkUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module
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
            halfImageArticleWithoutIntroUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.RightTwo]: [
        contentErrorHandler(
          () =>
            halfImageArticleWithoutIntroUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.RightThree]: [
        contentErrorHandler(
          () =>
            basicArticleTitleUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module
            ),
          HandlerInputType.TopStoriesV2,
          Strap.TopStories,
          params
        )
      ],
      [TopStoriesV2GridPositions.RightFour]: [
        contentErrorHandler(
          () =>
            basicArticleTitleUnit(
              articles.shift() as IRawArticle,
              strapName,
              ImageLayoutType.module
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

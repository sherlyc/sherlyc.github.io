import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  HalfFourGridPositions,
  IHalfFourGridHandlerInput
} from "../../__types__/IHalfFourGridHandlerInput";
import { IHalfFourHandlerInput } from "../../__types__/IHalfFourHandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { contentErrorHandler } from "../content-error-handler";
import { homepageHighlightArticle } from "../../../adapters/article-converter/homepage-highlight-article.converter";
import { JsonFeedImageType } from "../../../adapters/__types__/JsonFeedImageType";
import { AspectRatio } from "../../../../../common/AspectRatio";
import { HomepageHighlightArticleVariation } from "../../../../../common/__types__/IHomepageHighlightArticle";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { sourceId, strapName, displayName, color, linkUrl }: IHalfFourHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 4, params);

  const gridInput: IHalfFourGridHandlerInput = {
    type: HandlerInputType.HalfFourGrid,
    content: {
      [HalfFourGridPositions.ModuleTitle]: [
        {
          type: ContentBlockType.ModuleHeader,
          title: displayName,
          url: linkUrl,
          color
        }
      ],
      [HalfFourGridPositions.Left]: [
        contentErrorHandler(
          () =>
            homepageHighlightArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: {
                  variant: JsonFeedImageType.LANDSCAPE_SIXTEEN_BY_NINE,
                  aspectRatio: AspectRatio.SixteenByNine,
                },
              },
              HomepageHighlightArticleVariation.Featured,
              true
            ),
          HandlerInputType.HalfFour,
          sourceId,
          params
        )
      ],
      [HalfFourGridPositions.RightOne]: [
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
          HandlerInputType.HalfFour,
          sourceId,
          params
        )
      ],
      [HalfFourGridPositions.RightTwo]: [
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
              false
            ),
          HandlerInputType.HalfFour,
          sourceId,
          params
        )
      ],
      [HalfFourGridPositions.RightThree]: [
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
              false
            ),
          HandlerInputType.HalfFour,
          sourceId,
          params
        )
      ]
    }
  };

  return await handlerRunner(gridInput, params);
}

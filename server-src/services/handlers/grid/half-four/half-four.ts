import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IHalfFourHandlerInput } from "../../__types__/IHalfFourHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import {
  HalfFourGridPositions,
  IHalfFourGridHandlerInput
} from "../../__types__/IHalfFourGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { featuredArticle } from "../../../adapters/article-converter/featured-article.converter";
import { contentErrorHandler } from "../content-error-handler";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";

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
          type: ContentBlockType.ModuleTitle,
          displayName,
          displayNameColor: color,
          linkUrl
        }
      ],
      [HalfFourGridPositions.Left]: [
        contentErrorHandler(
          () =>
            featuredArticle(
              articles.shift() as IRawArticle,
              strapName,
              "black",
              "#f0f0f0"
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

import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IHalfFourHandlerInput } from "../../__types__/IHalfFourHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import {HalfFourGridPositions, IHalfFourGridHandlerInput} from "../../__types__/IHalfFourGridHandlerInput";
import {HandlerInputType} from "../../__types__/HandlerInputType";
import {ContentBlockType} from "../../../../../common/__types__/ContentBlockType";
import {featuredArticle} from "../../../adapters/article-converter/featured-article.converter";
import {contentErrorHandler} from "../content-error-handler";
import {responsiveBigImageArticleUnit} from "../../../adapters/article-converter/responsive-big-image-article.converter";
import {IRawArticle} from "../../../adapters/__types__/IRawArticle";
import {basicArticleUnit} from "../../../adapters/article-converter/basic-article-unit.converter";
import {basicArticleTitleUnit} from "../../../adapters/article-converter/basic-article-title.converter";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    displayName,
    color,
    linkUrl
  }: IHalfFourHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 4, params);

  const gridInput: IHalfFourGridHandlerInput = {
    type: HandlerInputType.HalfFourGrid,
    content: {
      [HalfFourGridPositions.ModuleTitle]: [{
        type: ContentBlockType.ModuleTitle,
        displayName,
        displayNameColor: color,
        linkUrl,
      }],
      [HalfFourGridPositions.Left]: [
        contentErrorHandler(
          () =>
            featuredArticle(
              articles.shift() as IRawArticle,
              strapName,
              "black",
              ""
            ),
          HandlerInputType.HalfFour,
          sourceId,
          params
        )
      ],
      [HalfFourGridPositions.RightOne]: [
        contentErrorHandler(
          () =>
            basicArticleTitleUnit(
              articles.shift() as IRawArticle,
              strapName,
              color
            ),
          HandlerInputType.HalfFour,
          sourceId,
          params
        )
      ],
      [HalfFourGridPositions.RightTwo]: [
        contentErrorHandler(
          () =>
            basicArticleTitleUnit(
              articles.shift() as IRawArticle,
              strapName,
              color
            ),
          HandlerInputType.HalfFour,
          sourceId,
          params
        )
      ],
      [HalfFourGridPositions.RightThree]: [
        contentErrorHandler(
          () =>
            basicArticleTitleUnit(
              articles.shift() as IRawArticle,
              strapName,
              color
            ),
          HandlerInputType.HalfFour,
          sourceId,
          params
        )
      ],
    }
  };

  return await handlerRunner(gridInput, params);
}

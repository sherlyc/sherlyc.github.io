import { handlerRunnerFunction } from "../../../runner";
import { IParams } from "../../../../__types__/IParams";
import { IContentBlock } from "../../../../../../common/__types__/IContentBlock";
import { ITopStoriesDefaultOneHandlerInput } from "../../../__types__/ITopStoriesDefaultOneHandlerInput";
import { IColumnGridHandlerInput } from "../../../__types__/IColumnGridHandlerInput";
import { HandlerInputType } from "../../../__types__/HandlerInputType";
import { contentErrorHandler } from "../../content-error-handler";
import { bigImageArticleUnit } from "../../../../adapters/article-converter/big-image-article.converter";
import { Strap } from "../../../../strap";
import { BigImageArticleUnitLayout } from "../../../../../../common/__types__/IBigImageArticleUnit";
import { featuredArticle } from "../../../../adapters/article-converter/featured-article.converter";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { articles, strapName }: ITopStoriesDefaultOneHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const columnGridHandlerInput: IColumnGridHandlerInput = {
    type: HandlerInputType.ColumnGrid,
    content: [
      [
        contentErrorHandler(
          () =>
            bigImageArticleUnit(
              articles[0],
              strapName,
              BigImageArticleUnitLayout.module
            ),
          HandlerInputType.TopStoriesDefaultOneBigTopLeft,
          Strap.TopStories,
          params
        )
      ],
      [
        contentErrorHandler(
          () =>
            featuredArticle(articles[1], strapName, "white", "black", false),
          HandlerInputType.TopStoriesDefaultOneBigTopLeft,
          Strap.TopStories,
          params
        )
      ]
    ]
  };
  return await handlerRunner(columnGridHandlerInput, params);
}

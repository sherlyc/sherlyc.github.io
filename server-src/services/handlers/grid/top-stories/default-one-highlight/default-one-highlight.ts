import { handlerRunnerFunction } from "../../../runner";
import { IParams } from "../../../../__types__/IParams";
import { IContentBlock } from "../../../../../../common/__types__/IContentBlock";
import { ITopStoriesDefaultOneHighlightHandlerInput } from "../../../__types__/ITopStoriesDefaultOneHighlightHandlerInput";
import { IColumnGridHandlerInput } from "../../../__types__/IColumnGridHandlerInput";
import { HandlerInputType } from "../../../__types__/HandlerInputType";
import { contentErrorHandler } from "../../content-error-handler";
import { bigImageArticleUnit } from "../../../../adapters/article-converter/big-image-article.converter";
import { Strap } from "../../../../strap";
import { BigImageArticleUnitLayout } from "../../../../../../common/__types__/IBigImageArticleUnit";
import { featuredArticle } from "../../../../adapters/article-converter/featured-article.converter";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { articles, strapName }: ITopStoriesDefaultOneHighlightHandlerInput,
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
          HandlerInputType.TopStoriesDefaultOneHighlight,
          Strap.TopStories,
          params
        )
      ],
      [
        contentErrorHandler(
          () =>
            featuredArticle(articles[1], strapName, "white", "black", false),
          HandlerInputType.TopStoriesDefaultOneHighlight,
          Strap.TopStories,
          params
        )
      ]
    ]
  };
  return await handlerRunner(columnGridHandlerInput, params);
}

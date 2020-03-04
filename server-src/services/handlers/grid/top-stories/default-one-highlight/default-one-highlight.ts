import { IContentBlock } from "../../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../../__types__/IParams";
import { bigImageArticleUnit } from "../../../../adapters/article-converter/big-image-article.converter";
import { featuredArticle } from "../../../../adapters/article-converter/featured-article.converter";
import { Strap } from "../../../../strap";
import { HandlerInputType } from "../../../__types__/HandlerInputType";
import { IColumnGridHandlerInput } from "../../../__types__/IColumnGridHandlerInput";
import { ITopStoriesDefaultOneHighlightHandlerInput } from "../../../__types__/ITopStoriesDefaultOneHighlightHandlerInput";
import { handlerRunnerFunction } from "../../../runner";
import { contentErrorHandler } from "../../content-error-handler";
import { ImageLayoutType } from "../../../../../../common/__types__/ImageLayoutType";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { articles, strapName, color }: ITopStoriesDefaultOneHighlightHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const columnGridHandlerInput: IColumnGridHandlerInput = {
    type: HandlerInputType.ColumnGrid,
    border: false,
    columnGap: 20,
    content: [
      [
        contentErrorHandler(
          () =>
            bigImageArticleUnit(
              articles[0],
              strapName,
              ImageLayoutType.module,
              true,
              color
            ),
          HandlerInputType.TopStoriesDefaultOneHighlight,
          Strap.TopStories,
          params
        )
      ],
      [
        contentErrorHandler(
          () =>
            featuredArticle(
              articles[1],
              strapName,
              "#fff",
              "#333",
              true,
              false,
              color
            ),
          HandlerInputType.TopStoriesDefaultOneHighlight,
          Strap.TopStories,
          params
        )
      ]
    ]
  };
  return await handlerRunner(columnGridHandlerInput, params);
}

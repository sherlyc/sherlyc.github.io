import { ContentBlockType } from "../../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../../__types__/IParams";
import { featuredArticle } from "../../../../adapters/article-converter/featured-article.converter";
import { halfWidthImageArticleUnit } from "../../../../adapters/article-converter/half-width-image-article-unit.converter";
import { gridBlock } from "../../../../adapters/grid/grid-block";
import { Strap } from "../../../../strap";
import { HandlerInputType } from "../../../__types__/HandlerInputType";
import { ITopStoriesDefconHighlightHandlerInput } from "../../../__types__/ITopStoriesDefconHighlightHandlerInput";
import { handlerRunnerFunction } from "../../../runner";
import { contentErrorHandler } from "../../content-error-handler";
import { DefconHighlightPosition } from "./defcon-highlight-position";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { articles, strapName, color }: ITopStoriesDefconHighlightHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [
    {
      type: ContentBlockType.GridContainer,
      items: {
        [DefconHighlightPosition.Featured]: contentErrorHandler(
          () =>
            featuredArticle(
              articles[0],
              strapName,
              "white",
              "black",
              false,
              true,
              color
            ),
          HandlerInputType.TopStoriesDefconHighlight,
          Strap.TopStories,
          params
        ),
        [DefconHighlightPosition.Related1]: contentErrorHandler(
          () => halfWidthImageArticleUnit(articles[1], strapName, color),
          HandlerInputType.TopStoriesDefconHighlight,
          Strap.TopStories,
          params
        ),
        [DefconHighlightPosition.Related2]: contentErrorHandler(
          () => halfWidthImageArticleUnit(articles[2], strapName, color),
          HandlerInputType.TopStoriesDefconHighlight,
          Strap.TopStories,
          params
        )
      },
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "0px",
        gridRowGap: "20px",
        gridBlocks: {
          [DefconHighlightPosition.Featured]: gridBlock(1, 1, 1, 1, []),
          [DefconHighlightPosition.Related1]: gridBlock(2, 1, 1, 1, []),
          [DefconHighlightPosition.Related2]: gridBlock(3, 1, 1, 1, [])
        }
      },
      tablet: {
        gridTemplateColumns: "1fr 3fr",
        gridTemplateRows: "auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: {
          [DefconHighlightPosition.Featured]: gridBlock(1, 2, 2, 1, []),
          [DefconHighlightPosition.Related1]: gridBlock(1, 1, 1, 1, []),
          [DefconHighlightPosition.Related2]: gridBlock(2, 1, 1, 1, [])
        }
      }
    }
  ];
}

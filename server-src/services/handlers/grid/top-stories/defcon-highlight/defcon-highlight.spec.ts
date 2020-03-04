import { ContentBlockType } from "../../../../../../common/__types__/ContentBlockType";
import { IParams } from "../../../../__types__/IParams";
import { IRawArticle } from "../../../../adapters/__types__/IRawArticle";
import { gridBlock } from "../../../../adapters/grid/grid-block";
import { HandlerInputType } from "../../../__types__/HandlerInputType";
import { ITopStoriesDefconHighlightHandlerInput } from "../../../__types__/ITopStoriesDefconHighlightHandlerInput";
import defconHighlightHandler from "./defcon-highlight";
import { DefconHighlightPosition } from "./defcon-highlight-position";

describe("Top Stories Defcon Highlight", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "strapName";
  const color = "blue";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("wraps the articles in grid container with defcon config", async () => {
    const handlerInput: ITopStoriesDefconHighlightHandlerInput = {
      type: HandlerInputType.TopStoriesDefconHighlight,
      articles: ["1", "2", "3"].map((id) => (({ id } as any) as IRawArticle)),
      strapName,
      color
    };

    expect(
      await defconHighlightHandler(handlerRunnerMock, handlerInput, params)
    ).toEqual([
      {
        type: ContentBlockType.GridContainer,
        items: {
          [DefconHighlightPosition.Featured]: expect.objectContaining({
            type: ContentBlockType.FeaturedArticle,
            id: "1",
            textColor: "white",
            boxColor: "black",
            applyGradient: false,
            pumped: true,
            identifierColor: color
          }),
          [DefconHighlightPosition.Related1]: expect.objectContaining({
            type: ContentBlockType.HalfWidthImageArticleUnit,
            id: "2",
            identifierColor: color
          }),
          [DefconHighlightPosition.Related2]: expect.objectContaining({
            type: ContentBlockType.HalfWidthImageArticleUnit,
            id: "3",
            identifierColor: color
          })
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
    ]);
  });
});

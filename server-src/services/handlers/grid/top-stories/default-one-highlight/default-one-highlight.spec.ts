import { ContentBlockType } from "../../../../../../common/__types__/ContentBlockType";
import { IParams } from "../../../../__types__/IParams";
import { IRawArticle } from "../../../../adapters/__types__/IRawArticle";
import { HandlerInputType } from "../../../__types__/HandlerInputType";
import { IColumnGridHandlerInput } from "../../../__types__/IColumnGridHandlerInput";
import { ITopStoriesDefaultOneHighlightHandlerInput } from "../../../__types__/ITopStoriesDefaultOneHighlightHandlerInput";
import defaultOneHighlightHandler from "./default-one-highlight";

describe("Top Stories Default One", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "strapName";

  const articleWithId = (id: number) => ({ id: `${id}` } as IRawArticle);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should layout content blocks using column grid handler", async () => {
    const handlerInput: ITopStoriesDefaultOneHighlightHandlerInput = {
      type: HandlerInputType.TopStoriesDefaultOneHighlight,
      articles: [articleWithId(1), articleWithId(2)],
      strapName
    };

    await defaultOneHighlightHandler(handlerRunnerMock, handlerInput, params);

    const columnGridExpectedInput: IColumnGridHandlerInput = {
      type: HandlerInputType.ColumnGrid,
      columnGap: 20,
      border: false,
      content: [
        [
          expect.objectContaining({
            type: ContentBlockType.BigImageArticleUnit,
            id: "1"
          })
        ],
        [
          expect.objectContaining({
            type: ContentBlockType.FeaturedArticle,
            id: "2"
          })
        ]
      ]
    };
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      columnGridExpectedInput,
      params
    );
  });
});

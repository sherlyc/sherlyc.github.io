import halfFour from "./half-four";
import { IParams } from "../../../__types__/IParams";
import { IHalfFourHandlerInput } from "../../__types__/IHalfFourHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { Strap } from "../../../strap";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { HalfFourGridPositions, IHalfFourGridHandlerInput } from "../../__types__/IHalfFourGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Half four", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const input: IHalfFourHandlerInput = {
    type: HandlerInputType.HalfFour,
    sourceId: Strap.NZFarmer,
    displayName: "NZ Farmer",
    color: "Orange",
    linkUrl: "/nz-farmer",
    strapName: "nz-farmer"
  };

  const articlesWithIds = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));

  const expectContentBlock = (type: ContentBlockType, id: number) =>
    expect.objectContaining({
      type,
      id: `${id}`
    });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve four articles", async () => {
    await halfFour(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(input.sourceId, 4, params);
  });

  it("should call half four grid with correct content", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(articlesWithIds([1, 2, 3, 4]));

    await halfFour(handlerRunnerMock, input, params);

    const expectedGrid: IHalfFourGridHandlerInput = {
      type: HandlerInputType.HalfFourGrid,
      content: {
        [HalfFourGridPositions.ModuleTitle]: [{
          type: ContentBlockType.ModuleTitle,
          displayName: input.displayName,
          displayNameColor: input.color,
          linkUrl: input.linkUrl,
        }],
        [HalfFourGridPositions.Left]: [expectContentBlock(ContentBlockType.FeaturedArticle, 1)],
        [HalfFourGridPositions.RightOne]: [expectContentBlock(ContentBlockType.BasicArticleTitleUnit, 2)],
        [HalfFourGridPositions.RightTwo]: [expectContentBlock(ContentBlockType.BasicArticleTitleUnit, 3)],
        [HalfFourGridPositions.RightThree]: [expectContentBlock(ContentBlockType.BasicArticleTitleUnit, 4)],
      }
    };

    expect(handlerRunnerMock).toHaveBeenCalledWith(expectedGrid, params);
  });
});

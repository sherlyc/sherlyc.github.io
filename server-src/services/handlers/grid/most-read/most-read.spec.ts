import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IMostReadHandlerInput } from "../../__types__/IMostReadHandlerInput";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import mostReadHandler from "./most-read";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import {
  IMostReadGridHandlerInput,
  MostReadGridPositions
} from "../../__types__/IMostReadGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";

jest.mock("../../../adapters/most-popular/most-popular.service");

describe("Most Read", () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const input: IMostReadHandlerInput = {
    type: HandlerInputType.MostRead,
    displayName: "most read",
    strapName: "most read"
  };

  const fakeRawArticles = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));
  const expectArticle = (id: number) =>
    expect.objectContaining({ id: `${id}` });
  const fakeContentBlock = (id: number) => ({ id: `${id}` } as IContentBlock);
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve right count of most popular articles", async () => {
    (getMostPopular as jest.Mock).mockResolvedValue(fakeRawArticles([]));
    await mostReadHandler(handlerRunner, input, params);

    expect(getMostPopular).toHaveBeenCalledWith(8, params);
  });

  it("should call most read grid", async () => {
    (getMostPopular as jest.Mock).mockResolvedValue(fakeRawArticles([1, 2, 3]));
    await mostReadHandler(handlerRunner, input, params);

    const expectedGrid: IMostReadGridHandlerInput = {
      type: HandlerInputType.MostReadGrid,
      content: {
        [MostReadGridPositions.Left]: [
          {
            type: ContentBlockType.MostReadList,
            articles: [expectArticle(1), expectArticle(2), expectArticle(3)],
            displayName: input.displayName,
            strapName: input.strapName
          }
        ],
        [MostReadGridPositions.Right]: [
          {
            type: ContentBlockType.StickyContainer,
            items: [basicAdUnit(input.strapName)]
          }
        ]
      }
    };

    expect(handlerRunner).toHaveBeenCalledWith(expectedGrid, params);
  });

  it("renders empty block of most read list when most popular API fails", async () => {
    (getMostPopular as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    await mostReadHandler(handlerRunner, input, params);

    const expectedGrid: IMostReadGridHandlerInput = {
      type: HandlerInputType.MostReadGrid,
      content: {
        [MostReadGridPositions.Left]: [
          {
            type: ContentBlockType.MostReadList,
            articles: [],
            displayName: input.displayName,
            strapName: input.strapName
          }
        ],
        [MostReadGridPositions.Right]: [
          {
            type: ContentBlockType.StickyContainer,
            items: [basicAdUnit(input.strapName)]
          }
        ]
      }
    };

    expect(handlerRunner).toHaveBeenCalledWith(expectedGrid, params);
  });
});

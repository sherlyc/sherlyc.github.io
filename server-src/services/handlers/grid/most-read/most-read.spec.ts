import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { Strap } from "../../../strap";
import logger from "../../../utils/logger";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IMostReadGridHandlerInput, MostReadGridPositions } from "../../__types__/IMostReadGridHandlerInput";
import { IMostReadHandlerInput } from "../../__types__/IMostReadHandlerInput";
import mostReadHandler from "./most-read";

jest.mock("../../../adapters/most-popular/most-popular.service");
jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../utils/logger");

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

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve right count of most popular articles", async () => {
    (getMostPopular as jest.Mock).mockResolvedValue(fakeRawArticles([]));
    (getRawArticles as jest.Mock).mockResolvedValue(fakeRawArticles([]));
    await mostReadHandler(handlerRunner, input, params);

    expect(getMostPopular).toHaveBeenCalledWith(8, params);
  });

  it("should retrieve right count of daily fix articles", async () => {
    (getMostPopular as jest.Mock).mockResolvedValue(fakeRawArticles([]));
    (getRawArticles as jest.Mock).mockResolvedValue(fakeRawArticles([]));
    await mostReadHandler(handlerRunner, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.DailyFix, 4, params);
  });

  it("should call most read grid", async () => {
    (getMostPopular as jest.Mock).mockResolvedValue(fakeRawArticles([1, 2, 3]));
    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeRawArticles([5, 6, 7, 8])
    );
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
            items: [
              {
                type: ContentBlockType.BasicAdUnit,
                context: input.strapName
              }
            ]
          }
        ],
        [MostReadGridPositions.Bottom]: [
          {
            type: ContentBlockType.DailyFix,
            articles: [
              expectArticle(5),
              expectArticle(6),
              expectArticle(7),
              expectArticle(8)
            ],
            displayName: "daily fix",
            strapName: "homepagev2DailyFix"
          }
        ]
      }
    };

    expect(handlerRunner).toHaveBeenCalledWith(expectedGrid, params);
  });

  it("renders empty block of most read list when most popular API fails", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeRawArticles([5, 6, 7, 8])
    );
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
            items: [
              expect.objectContaining({
                type: ContentBlockType.BasicAdUnit
              })
            ]
          }
        ],
        [MostReadGridPositions.Bottom]: [
          expect.objectContaining({
            type: ContentBlockType.DailyFix
          })
        ]
      }
    };

    expect(logger.error).toHaveBeenCalled();
    expect(handlerRunner).toHaveBeenCalledWith(expectedGrid, params);
  });

  it("passes no articles to daily fix when failing to retrieve daily fix articles", async () => {
    (getMostPopular as jest.Mock).mockResolvedValue(fakeRawArticles([1, 2, 3]));
    (getRawArticles as jest.Mock).mockRejectedValue(new Error());
    await mostReadHandler(handlerRunner, input, params);

    const expectedGrid: IMostReadGridHandlerInput = {
      type: HandlerInputType.MostReadGrid,
      content: {
        [MostReadGridPositions.Left]: [
          expect.objectContaining({
            type: ContentBlockType.MostReadList
          })
        ],
        [MostReadGridPositions.Right]: [
          {
            type: ContentBlockType.StickyContainer,
            items: [
              expect.objectContaining({
                type: ContentBlockType.BasicAdUnit
              })
            ]
          }
        ],
        [MostReadGridPositions.Bottom]: [
          {
            type: ContentBlockType.DailyFix,
            articles: [],
            displayName: "daily fix",
            strapName: "homepagev2DailyFix"
          }
        ]
      }
    };

    expect(logger.error).toHaveBeenCalled();
    expect(handlerRunner).toHaveBeenCalledWith(expectedGrid, params);
  });
});

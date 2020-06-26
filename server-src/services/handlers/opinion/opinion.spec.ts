import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { Strap } from "../../strap";
import logger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IOpinionHandlerInput } from "../__types__/IOpinionHandlerInput";
import opinion from "./opinion";

jest.mock("../../adapters/article-retriever/article-retriever");
jest.mock("../../utils/logger");

const fakeRawArticles = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

const expectArticle = (id: number) => expect.objectContaining({ id: `${id}` });

describe("Opinion handler", () => {
  const params: IParams = { apiRequestId: "123" };
  const handlerRunnerMock = jest.fn();
  const input: IOpinionHandlerInput = {
    type: HandlerInputType.Opinion,
    strapName: "strapName",
    displayName: "opinion"
  };

  beforeEach(() => {
    jest.resetAllMocks();

    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeRawArticles([1, 2, 3, 4, 5])
    );
  });

  it("should retrieve articles from cartoon & opinion list assets", async () => {
    await opinion(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.Cartoons, 1, params);
    expect(getRawArticles).toHaveBeenCalledWith(Strap.Opinion, 4, params);
  });

  it("should return empty when there is no cartoon and article content", async () => {
    (getRawArticles as jest.Mock).mockResolvedValueOnce([]);
    (getRawArticles as jest.Mock).mockResolvedValueOnce([]);

    const result = await opinion(handlerRunnerMock, input, params);

    expect(result).toEqual([]);
    expect(logger.warn).toHaveBeenCalledWith(
      params.apiRequestId,
      "No articles retrieved from opinion list"
    );
  });

  it("should return opinion content block with cartoons and  article content", async () => {
    (getRawArticles as jest.Mock).mockResolvedValueOnce(fakeRawArticles([1]));
    (getRawArticles as jest.Mock).mockResolvedValueOnce(
      fakeRawArticles([2, 3, 4, 5])
    );
    const [opinionContentBlock] = await opinion(
      handlerRunnerMock,
      input,
      params
    );

    expect(opinionContentBlock).toEqual({
      type: ContentBlockType.Opinion,
      articles: [
        expectArticle(2),
        expectArticle(3),
        expectArticle(4),
        expectArticle(5)
      ],
      cartoons: [expectArticle(1)],
      strapName: input.strapName,
      displayName: input.displayName
    });
  });

  it("should log error and return empty content block when failing to retrieve videos", async () => {
    const error = new Error("Failed to retrieve articles");
    (getRawArticles as jest.Mock).mockRejectedValue(error);
    const result = await opinion(handlerRunnerMock, input, params);

    expect(result).toEqual([]);
    expect(logger.error).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.any(String),
      error
    );
  });
});

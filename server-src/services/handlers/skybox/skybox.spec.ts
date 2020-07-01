import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { Strap } from "../../strap";
import logger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { ISkyboxHandlerInput } from "../__types__/ISkyboxHandlerInput";
import skybox from "./skybox";

jest.mock("../../adapters/article-retriever/article-retriever");
jest.mock("../../utils/logger");

const fakeRawArticles = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

const expectArticle = (id: number) => expect.objectContaining({ id: `${id}` });

describe("Skybox handler", () => {
  const params: IParams = { apiRequestId: "123" };
  const handlerRunnerMock = jest.fn();
  const input: ISkyboxHandlerInput = {
    type: HandlerInputType.Skybox,
    sourceId: Strap.Skybox,
    strapName: Strap.Skybox,
    articleCount: 4
  };

  beforeEach(() => {
    jest.resetAllMocks();

    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeRawArticles([1, 2, 3, 4])
    );
  });

  it("should retrieve articles from Skybox list asset", async () => {
    await skybox(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.Skybox, 4, params);
  });

  it("should return empty when there is insufficient articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValueOnce(
      fakeRawArticles([1, 2])
    );

    const result = await skybox(handlerRunnerMock, input, params);

    expect(result).toEqual([]);
    expect(logger.warn).toHaveBeenCalledWith(
      params.apiRequestId,
      "Insufficient articles retrieved from Skybox list"
    );
  });

  it("should return correct content blocks with article content", async () => {
    const [contentBlocks] = await skybox(handlerRunnerMock, input, params);

    expect(contentBlocks).toEqual({
      type: ContentBlockType.Skybox,
      articles: [
        expectArticle(1),
        expectArticle(2),
        expectArticle(3),
        expectArticle(4)
      ],
      strapName: input.strapName
    });
  });

  it("should log error and return empty when failing to retrieve articles", async () => {
    const error = new Error("Failed to retrieve articles");
    (getRawArticles as jest.Mock).mockRejectedValue(error);
    const result = await skybox(handlerRunnerMock, input, params);

    expect(result).toEqual([]);
    expect(logger.error).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.any(String),
      error
    );
  });
});

import newsSixHandler from "./news-six";
import { INewsSixHandlerInput } from "../../__types__/INewsSixHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { Strap } from "../../../strap";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import logger from "../../../utils/logger";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { responsiveBigImageArticleUnit } from "../../../adapters/article-converter/responsive-big-image-article.converter";
import {
  INewsSixGridHandlerInput,
  NewsSixGridPositions
} from "../../__types__/INewsSixGridHandlerInput";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../utils/logger");
jest.mock("../../../adapters/article-converter/big-image-article.converter");
jest.mock("../../../adapters/article-converter/basic-article-title.converter");
jest.mock(
  "../../../adapters/article-converter/responsive-big-image-article.converter"
);

describe("News six handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = { apiRequestId: "id" };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should work log and throw error when not enough articles are available", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    (bigImageArticleUnit as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    (basicArticleTitleUnit as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    (responsiveBigImageArticleUnit as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    const input: INewsSixHandlerInput = {
      type: HandlerInputType.NewsSix,
      displayName: "FakeName",
      displayNameColor: "FakeColor",
      strapName: "FakeStrap",
      sourceId: "sourceId" as Strap
    };

    expect.assertions(2);
    try {
      await newsSixHandler(handlerRunnerMock, input, params);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledWith(
        params.apiRequestId,
        expect.stringContaining(
          "News Six handler error: Potentially insufficient number of articles:"
        )
      );
      expect(error).toBeTruthy();
    }
  });

  it("should retrieve articles by source id and limit", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    const input: INewsSixHandlerInput = {
      type: HandlerInputType.NewsSix,
      displayName: "FakeName",
      displayNameColor: "FakeColor",
      strapName: "FakeStrap",
      sourceId: "sourceId" as Strap
    };

    await newsSixHandler(handlerRunnerMock, input, params);
    expect(getRawArticles).toHaveBeenCalledWith("sourceId", 6, params);
  });

  it("should provide correct input to next handler", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    (bigImageArticleUnit as jest.Mock).mockReturnValue({});
    (basicArticleTitleUnit as jest.Mock).mockReturnValue({});
    (responsiveBigImageArticleUnit as jest.Mock).mockReturnValue({});

    const fakeResult = {};
    handlerRunnerMock.mockResolvedValue(fakeResult);

    const input: INewsSixHandlerInput = {
      type: HandlerInputType.NewsSix,
      displayName: "FakeName",
      displayNameColor: "FakeColor",
      strapName: "FakeStrap",
      sourceId: "sourceId" as Strap
    };

    const result = await newsSixHandler(handlerRunnerMock, input, params);

    const fakeInput = {} as IContentBlock;

    const expected: INewsSixGridHandlerInput = {
      type: HandlerInputType.NewsSixGrid,
      content: {
        [NewsSixGridPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName: "FakeName",
            displayNameColor: "FakeColor"
          }
        ],
        [NewsSixGridPositions.BigTopLeft]: [fakeInput],
        [NewsSixGridPositions.SmallTopRight]: [fakeInput],
        [NewsSixGridPositions.SmallBottomFirst]: [fakeInput],
        [NewsSixGridPositions.SmallBottomSecond]: [fakeInput],
        [NewsSixGridPositions.SmallBottomThird]: [fakeInput],
        [NewsSixGridPositions.SmallBottomFourth]: [fakeInput]
      }
    };

    expect(handlerRunnerMock).toHaveBeenCalledWith(expected, params);
    expect(result).toEqual(fakeResult);
  });
});

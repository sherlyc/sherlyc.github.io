import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  INewsSixGridHandlerInput,
  NewsSixGridPositions
} from "../../__types__/INewsSixGridHandlerInput";
import { INewsSixHandlerInput } from "../../__types__/INewsSixHandlerInput";
import newsSixHandler from "./news-six";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../utils/logger");

const articlesWithIds = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

const expectBasicArticleTitle = (id: number, identifierColor: string) =>
  expect.objectContaining({
    type: ContentBlockType.BasicArticleTitleUnit,
    id: `${id}`,
    identifierColor
  });

describe("News six handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = { apiRequestId: "id" };
  const displayNameColor = "green";
  const input: INewsSixHandlerInput = {
    type: HandlerInputType.NewsSix,
    displayName: "FakeName",
    color: displayNameColor,
    linkUrl: "http://www.stuff.co.nz",
    strapName: "FakeStrap",
    sourceId: "sourceId" as Strap
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve articles by source id and limit", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);

    await newsSixHandler(handlerRunnerMock, input, params);
    expect(getRawArticles).toHaveBeenCalledWith("sourceId", 6, params);
  });

  it("should provide correct input to next handler", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6])
    );

    const fakeResult = {};
    handlerRunnerMock.mockResolvedValue(fakeResult);

    const result = await newsSixHandler(handlerRunnerMock, input, params);

    const expected: INewsSixGridHandlerInput = {
      type: HandlerInputType.NewsSixGrid,
      content: {
        [NewsSixGridPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName: input.displayName,
            displayNameColor: input.color,
            linkUrl: input.linkUrl
          }
        ],
        [NewsSixGridPositions.BigTopLeft]: [
          expect.objectContaining({
            type: ContentBlockType.ResponsiveBigImageArticle,
            id: "1",
            identifierColor: displayNameColor
          })
        ],
        [NewsSixGridPositions.SmallTopRight]: [
          expect.objectContaining({
            type: ContentBlockType.BigImageArticleUnit,
            id: "2",
            identifierColor: displayNameColor
          })
        ],
        [NewsSixGridPositions.SmallBottomFirst]: [
          expectBasicArticleTitle(3, displayNameColor)
        ],
        [NewsSixGridPositions.SmallBottomSecond]: [
          expectBasicArticleTitle(4, displayNameColor)
        ],
        [NewsSixGridPositions.SmallBottomThird]: [
          expectBasicArticleTitle(5, displayNameColor)
        ],
        [NewsSixGridPositions.SmallBottomFourth]: [
          expectBasicArticleTitle(6, displayNameColor)
        ]
      }
    };

    expect(handlerRunnerMock).toHaveBeenCalledWith(expected, params);
    expect(result).toEqual(fakeResult);
  });
});

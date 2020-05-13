import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  INewsSixGridV2HandlerInput,
  NewsSixV2GridPositions
} from "../../__types__/INewsSixGridV2HandlerInput";
import { INewsSixV2HandlerInput } from "../../__types__/INewsSixV2HandlerInput";
import newsSixV2Handler from "./news-six-v2";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../utils/logger");

const articlesWithIds = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

const expectContentBlock = (
  props: Partial<IContentBlock> & Pick<IContentBlock, "type">
) => expect.objectContaining(props);

describe("News Six V2 handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = { apiRequestId: "id" };
  const displayNameColor = "green";
  const input: INewsSixV2HandlerInput = {
    type: HandlerInputType.NewsSixV2,
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

    await newsSixV2Handler(handlerRunnerMock, input, params);
    expect(getRawArticles).toHaveBeenCalledWith("sourceId", 6, params);
  });

  it("should provide correct input to next handler", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6])
    );

    const fakeResult = {};
    handlerRunnerMock.mockResolvedValue(fakeResult);

    const actual = await newsSixV2Handler(handlerRunnerMock, input, params);

    const expected: INewsSixGridV2HandlerInput = {
      type: HandlerInputType.NewsSixV2Grid,
      content: {
        [NewsSixV2GridPositions.ModuleTitle]: [
          expectContentBlock({
            type: ContentBlockType.ModuleTitle,
            displayName: input.displayName,
            displayNameColor: input.color,
            linkUrl: input.linkUrl
          })
        ],
        [NewsSixV2GridPositions.TopLeft]: [
          expectContentBlock({
            type: ContentBlockType.FeaturedArticle,
            id: "1",
            textColor: "#333",
            boxColor: "#f2f2f2",
            identifierColor: displayNameColor
          })
        ],
        [NewsSixV2GridPositions.MidFirst]: [
          expectContentBlock({
            type: ContentBlockType.BasicArticleTitleUnit,
            id: "2",
            identifierColor: displayNameColor
          })
        ],
        [NewsSixV2GridPositions.MidSecond]: [
          expectContentBlock({
            type: ContentBlockType.BasicArticleTitleUnit,
            id: "3",
            identifierColor: displayNameColor
          })
        ],
        [NewsSixV2GridPositions.TopRight]: [
          expectContentBlock({
            type: ContentBlockType.FeaturedArticle,
            id: "4",
            textColor: "#333",
            boxColor: "#f2f2f2",
            identifierColor: displayNameColor
          })
        ],
        [NewsSixV2GridPositions.BottomFirst]: [
          expectContentBlock({
            type: ContentBlockType.ResponsiveBigImageArticle,
            id: "5",
            identifierColor: displayNameColor
          })
        ],
        [NewsSixV2GridPositions.BottomSecond]: [
          expectContentBlock({
            type: ContentBlockType.ResponsiveBigImageArticle,
            id: "6",
            identifierColor: displayNameColor
          })
        ]
      }
    };

    expect(handlerRunnerMock).toHaveBeenCalledWith(expected, params);
    expect(actual).toEqual(fakeResult);
  });
});

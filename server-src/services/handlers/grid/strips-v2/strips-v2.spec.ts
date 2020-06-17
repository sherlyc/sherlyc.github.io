import { IStripsV2HandlerInput } from "../../__types__/IStripsV2HandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { Strap } from "../../../strap";
import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { Section } from "../../../section";
import stripsV2 from "./strips-v2";
import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { StripsGridPositions } from "../../__types__/IStripsGridHandlerInput";

jest.mock("../../../adapters/article-retriever/article-retriever");

const fakeArticlesWithIds = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

describe("Strips V2", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const input: IStripsV2HandlerInput = {
    type: HandlerInputType.StripsV2,
    strapName: Strap.Premium,
    articleCount: 4,
    sourceId: Strap.Premium,
    color: AccentColor.Black,
    displayName: "spotlight",
    linkUrl: "/" + Section.Premium,
  };
  beforeEach(() => {
    jest.resetAllMocks();

    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([1, 2, 3, 4])
    );
  });

  it("should retrieve right count of articles", async () => {
    await stripsV2(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.Premium,
      input.articleCount,
      params
    );
  });

  it("should call column grid with featured articles", async () => {
    await stripsV2(handlerRunnerMock, input, params);

    expect(handlerRunnerMock).toHaveBeenNthCalledWith(
      1,
      {
        type: HandlerInputType.ColumnGrid,
        border: false,
        columnGap: 20,
        rowGap: 20,
        content: ["1", "2", "3", "4"].map((id) =>
          expect.objectContaining({
            type: ContentBlockType.FeaturedArticle,
            id,
            textColor: "white",
            boxColor: "#222",
            applyGradient: false,
          })
        ),
      },
      params
    );
  });

  it("should call strips grid", async () => {
    handlerRunnerMock.mockResolvedValueOnce([
      {
        type: ContentBlockType.GridContainer,
      },
    ]);

    await stripsV2(handlerRunnerMock, input, params);

    expect(handlerRunnerMock).toHaveBeenNthCalledWith(
      2,
      {
        type: HandlerInputType.StripsGrid,
        content: {
          [StripsGridPositions.ModuleTitle]: [
            expect.objectContaining({
              type: ContentBlockType.ModuleHeader,
              title: input.displayName,
              url: input.linkUrl,
              color: input.color,
            }),
          ],
          [StripsGridPositions.ModuleContent]: [
            expect.objectContaining({
              type: ContentBlockType.GridContainer,
            }),
          ],
        },
      },
      params
    );
  });
});

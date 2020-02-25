import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { StripsGridPositions } from "../../__types__/IStripsGridHandlerInput";
import { IStripsHandlerInput } from "../../__types__/IStripsHandlerInput";
import stripsHandler from "./strips";
import { ImageLayoutType } from "../../../../../common/__types__/ImageLayoutType";

jest.mock("../../../adapters/article-retriever/article-retriever");

const fakeArticlesWithIds = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

const expectContentBlock = (
  props: Partial<IContentBlock> & Pick<IContentBlock, "type">
) => expect.objectContaining(props);

describe("Strips", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const sourceId = Strap.Premium;
  const articleCount = 4;
  const articleFormat = ContentBlockType.FeaturedArticle;
  const strapName = Strap.Premium;
  const displayName = "Premium";
  const displayNameColor = "premiumdark";
  const linkUrl = "http://www.stuff.co.nz";
  const stripsHandlerInput: IStripsHandlerInput = {
    type: HandlerInputType.Strips,
    displayName,
    displayNameColor,
    linkUrl,
    strapName,
    sourceId,
    articleCount,
    articleFormat
  };

  beforeEach(() => {
    jest.resetAllMocks();

    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([1, 2, 3, 4])
    );
  });

  it("should retrieve right count of articles", async () => {
    await stripsHandler(handlerRunnerMock, stripsHandlerInput, params);

    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.Premium,
      articleCount,
      params
    );
  });

  describe("when using BigImageArticleUnit format", () => {
    it("should call column grid with articles of correct format", async () => {
      await stripsHandler(
        handlerRunnerMock,
        {
          ...stripsHandlerInput,
          articleFormat: ContentBlockType.BigImageArticleUnit
        },
        params
      );

      expect(handlerRunnerMock).toHaveBeenNthCalledWith(
        1,
        {
          type: HandlerInputType.ColumnGrid,
          border: false,
          columnGap: 20,
          rowGap: 20,
          content: ["1", "2", "3", "4"].map((id) =>
            expectContentBlock({
              type: ContentBlockType.BigImageArticleUnit,
              id,
              layout: ImageLayoutType.module
            })
          )
        },
        params
      );
    });
  });

  describe("when using HalfWidthImageArticle format", () => {
    it("should call column grid with articles of correct format", async () => {
      await stripsHandler(
        handlerRunnerMock,
        {
          ...stripsHandlerInput,
          articleFormat: ContentBlockType.HalfWidthImageArticleUnit
        },
        params
      );

      expect(handlerRunnerMock).toHaveBeenNthCalledWith(
        1,
        {
          type: HandlerInputType.ColumnGrid,
          border: false,
          columnGap: 20,
          rowGap: 20,
          content: ["1", "2", "3", "4"].map((id) =>
            expectContentBlock({
              type: ContentBlockType.HalfWidthImageArticleUnit,
              id
            })
          )
        },
        params
      );
    });
  });

  describe("when using FeaturedArticleUnit format", () => {
    it("should call column grid with articles of correct format", async () => {
      await stripsHandler(
        handlerRunnerMock,
        {
          ...stripsHandlerInput,
          articleFormat: ContentBlockType.FeaturedArticle
        },
        params
      );

      expect(handlerRunnerMock).toHaveBeenNthCalledWith(
        1,
        {
          type: HandlerInputType.ColumnGrid,
          border: false,
          columnGap: 20,
          rowGap: 20,
          content: ["1", "2", "3", "4"].map((id) =>
            expectContentBlock({
              type: ContentBlockType.FeaturedArticle,
              id,
              textColor: "white",
              boxColor: "black",
              applyGradient: false
            })
          )
        },
        params
      );
    });
  });

  it("should call strips grid", async () => {
    handlerRunnerMock.mockResolvedValueOnce([
      {
        type: ContentBlockType.GridContainer
      }
    ]);

    await stripsHandler(handlerRunnerMock, stripsHandlerInput, params);

    expect(handlerRunnerMock).toHaveBeenNthCalledWith(
      2,
      {
        type: HandlerInputType.StripsGrid,
        content: {
          [StripsGridPositions.ModuleTitle]: [
            expectContentBlock({
              type: ContentBlockType.ModuleTitle,
              displayName,
              displayNameColor,
              linkUrl
            })
          ],
          [StripsGridPositions.ModuleContent]: [
            expectContentBlock({
              type: ContentBlockType.GridContainer
            })
          ]
        }
      },
      params
    );
  });
});

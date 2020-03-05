import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";
import { IBasicArticleTitleUnit } from "../../../../../common/__types__/IBasicArticleTitleUnit";
import { IBigImageArticleUnit } from "../../../../../common/__types__/IBigImageArticleUnit";
import {
  IGridConfig,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { IModuleTitle } from "../../../../../common/__types__/IModuleTitle";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ILargeLeadSixGridHandlerInput,
  LargeLeadSixGridPositions
} from "../../__types__/ILargeLeadSixGridHandlerInput";
import { ILargeLeadSixHandlerInput } from "../../__types__/ILargeLeadSixHandlerInput";
import largeLeadSixHandler from "../large-lead-six/large-lead-six";
import { ImageLayoutType } from "../../../../../common/__types__/ImageLayoutType";

jest.mock("../../../adapters/article-retriever/article-retriever");

const articlesWithIds = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

const expectBasicArticleTitle = (id: number, identifierColor: string) =>
  expect.objectContaining({
    type: ContentBlockType.BasicArticleTitleUnit,
    id: `${id}`,
    identifierColor
  });

describe("Large lead six", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const sourceId = Strap.NowToLove;
  const strapName = "fakeStrapName";
  const displayName = "displayName";
  const displayNameColor = "displayNameColor";
  const linkUrl = "http://www.stuff.co.nz";

  const moduleTitle: IModuleTitle = {
    type: ContentBlockType.ModuleTitle,
    displayName,
    displayNameColor,
    linkUrl
  };
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    const input: ILargeLeadSixHandlerInput = {
      type: HandlerInputType.LargeLeadSix,
      displayName,
      displayNameColor,
      linkUrl,
      strapName,
      sourceId
    };

    await largeLeadSixHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(sourceId, 6, params);
  });

  it("should create content blocks and pass them to large lead six grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6])
    );
    const listGridResult: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {},
      mobile: {} as IGridConfig,
      tablet: {} as IGridConfig,
      desktop: {} as IGridConfig
    };
    handlerRunnerMock.mockResolvedValueOnce([listGridResult]);

    const input: ILargeLeadSixHandlerInput = {
      type: HandlerInputType.LargeLeadSix,
      displayName,
      displayNameColor,
      linkUrl,
      strapName,
      sourceId
    };
    await largeLeadSixHandler(handlerRunnerMock, input, params);

    const [
      [listGridHandlerInput, listGridHandlerParams],
      [largeLeadSixGridHandlerInput, largeLeadSixGridParams]
    ] = handlerRunnerMock.mock.calls;
    expect(listGridHandlerInput).toEqual({
      type: HandlerInputType.ListGrid,
      content: [
        expectBasicArticleTitle(2, displayNameColor),
        expectBasicArticleTitle(3, displayNameColor),
        expectBasicArticleTitle(4, displayNameColor),
        expectBasicArticleTitle(5, displayNameColor),
        expectBasicArticleTitle(6, displayNameColor)
      ]
    });
    expect(listGridHandlerParams).toEqual(params);
    expect(largeLeadSixGridHandlerInput).toEqual({
      type: HandlerInputType.LargeLeadSixGrid,
      content: {
        [LargeLeadSixGridPositions.ModuleTitle]: [moduleTitle],
        [LargeLeadSixGridPositions.Left]: [
          expect.objectContaining({
            type: ContentBlockType.BigImageArticleUnit,
            id: "1",
            identifierColor: displayNameColor
          })
        ],
        [LargeLeadSixGridPositions.Middle]: [listGridResult],
        [LargeLeadSixGridPositions.Right]: [
          {
            type: ContentBlockType.StickyContainer,
            items: [basicAdUnit]
          }
        ]
      }
    });
    expect(largeLeadSixGridParams).toEqual(params);
  });
});

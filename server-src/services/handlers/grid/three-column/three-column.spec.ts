import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IModuleTitle } from "../../../../../common/__types__/IModuleTitle";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBasicArticleTitleUnit } from "../../../../../common/__types__/IBasicArticleTitleUnit";
import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IThreeColumnHandlerInput } from "../../__types__/IThreeColumnHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import threeColumnHandler from "./three-column";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { Strap } from "../../../strap";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Three column", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const displayName = "test";
  const displayNameColor = "testColor";
  const listGridResult = {
    type: ContentBlockType.GridContainer,
    items: {},
    mobile: {} as IGridConfig,
    tablet: {} as IGridConfig,
    desktop: {} as IGridConfig
  };

  const contentBlock = (id: string) => ({ id } as IContentBlock);

  const article: IRawArticle = {
    id: "1",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    defconSrc: null,
    imageSrc: "1.jpg",
    imageSrcSet: "1.jpg 1w",
    sixteenByNineSrc: "16by9.jpg",
    strapImageSrc: "strap1.jpg",
    strapImageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const moduleTitle: IModuleTitle = {
    type: ContentBlockType.ModuleTitle,
    displayName,
    displayNameColor
  };

  const articleAsTitleUnit = (strapName: string): IBasicArticleTitleUnit => ({
    type: ContentBlockType.BasicArticleTitleUnit,
    id: "1",
    strapName,
    indexHeadline: "Headline 1",
    title: "Title One",
    linkUrl: "/link1",
    lastPublishedTime: 1,
    headlineFlags: []
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve 3 list of articles", async () => {
    const totalArticles = 8;
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(totalArticles).fill(article)
    );

    const input: IThreeColumnHandlerInput = {
      type: HandlerInputType.ThreeColumn
    };

    handlerRunnerMock.mockResolvedValue([]);
    await threeColumnHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledTimes(3);
    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.EditorPicks,
      totalArticles,
      params
    );
    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.Business,
      totalArticles,
      params
    );
    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.Opinion,
      totalArticles,
      params
    );
  });

  it("should create column one content with module title and pass it to column grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(new Array(8).fill(article));
    const fakeListGrid = { type: ContentBlockType.GridContainer };
    handlerRunnerMock.mockResolvedValue(fakeListGrid);

    const input: IThreeColumnHandlerInput = {
      type: HandlerInputType.ThreeColumn
    };

    await threeColumnHandler(handlerRunnerMock, input, params);

    const [
      [firstListGridCall],
      [second],
      [third],
      [columnGridCall]
    ] = handlerRunnerMock.mock.calls;

    const listGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: new Array(8).fill(articleAsTitleUnit("Editors' Picks"))
    };
    expect(firstListGridCall).toEqual(listGridHandlerInput);

    const title: IModuleTitle = {
      type: ContentBlockType.ModuleTitle,
      displayName: "Editors' Picks",
      displayNameColor: "pizzaz"
    };
    expect(columnGridCall.content[0]).toEqual([title, fakeListGrid]);
  });

  it("should create column two content with module title and pass it to column grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(new Array(8).fill(article));
    const fakeListGrid = { type: ContentBlockType.GridContainer };
    handlerRunnerMock.mockResolvedValue(fakeListGrid);

    const input: IThreeColumnHandlerInput = {
      type: HandlerInputType.ThreeColumn
    };

    await threeColumnHandler(handlerRunnerMock, input, params);

    const [
      [listGridCall],
      [secondListGridCall],
      [third],
      [columnGridCall]
    ] = handlerRunnerMock.mock.calls;

    const listGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: new Array(8).fill(articleAsTitleUnit("Business"))
    };
    expect(secondListGridCall).toEqual(listGridHandlerInput);

    const title: IModuleTitle = {
      type: ContentBlockType.ModuleTitle,
      displayName: "Business",
      displayNameColor: "pizzaz"
    };
    expect(columnGridCall.content[1]).toEqual([title, fakeListGrid]);
  });

  it("should create column three content with module title and pass it to column grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(new Array(8).fill(article));
    const fakeListGrid = { type: ContentBlockType.GridContainer };
    handlerRunnerMock.mockResolvedValue(fakeListGrid);

    const input: IThreeColumnHandlerInput = {
      type: HandlerInputType.ThreeColumn
    };

    await threeColumnHandler(handlerRunnerMock, input, params);

    const [
      [first],
      [second],
      [thirdListGridCall],
      [columnGridCall]
    ] = handlerRunnerMock.mock.calls;

    const listGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: new Array(8).fill(articleAsTitleUnit("Opinion"))
    };
    expect(thirdListGridCall).toEqual(listGridHandlerInput);

    const title: IModuleTitle = {
      type: ContentBlockType.ModuleTitle,
      displayName: "Opinion",
      displayNameColor: "pizzaz"
    };
    expect(columnGridCall.content[2]).toEqual([title, fakeListGrid]);
  });
});

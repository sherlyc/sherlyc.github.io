import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IBrandHandlerInput } from "../../__types__/IBrandHandlerInput";
import brandHandler from "./brand";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  BrandGridPositions,
  IBrandGridHandlerInput
} from "../../__types__/IBrandGridHandlerInput";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Network Top Stories Handler", () => {
  const params: IParams = { apiRequestId: "123" };

  const fakeArticle: IRawArticle = {
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

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve 10 list of articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(5).fill(fakeArticle)
    );
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue([]);

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };
    await brandHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledTimes(10);
    expect(getRawArticles).toHaveBeenCalledWith(expect.any(String), 5, params);
  });

  it("should pass 5 articles to each column grid handler", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(5).fill(fakeArticle)
    );
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue({});

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };
    await brandHandler(handlerRunnerMock, input, params);

    const [
      [firstColumnGridCall],
      [secondColumnGridCall]
    ] = handlerRunnerMock.mock.calls;
    const expectBulletList = expect.objectContaining({
      type: ContentBlockType.BulletList
    });
    expect(firstColumnGridCall.content).toEqual([
      [expectBulletList],
      [expectBulletList],
      [expectBulletList],
      [expectBulletList],
      [expectBulletList]
    ]);
    expect(secondColumnGridCall.content).toEqual([
      [expectBulletList],
      [expectBulletList],
      [expectBulletList],
      [expectBulletList],
      [expectBulletList]
    ]);
  });

  it("should pass the result of column grid handlers to brand grid handler", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(5).fill(fakeArticle)
    );
    const handlerRunnerMock = jest.fn();
    const fakeGridContainer = {} as IGridContainer;
    handlerRunnerMock.mockResolvedValue(fakeGridContainer);

    const expectedBrandGridInput: IBrandGridHandlerInput = {
      type: HandlerInputType.BrandGrid,
      content: {
        [BrandGridPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName: "Our Network's Top Stories",
            displayNameColor: "black"
          }
        ],
        [BrandGridPositions.FirstRow]: [fakeGridContainer],
        [BrandGridPositions.SecondRow]: [fakeGridContainer]
      }
    };

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };
    await brandHandler(handlerRunnerMock, input, params);

    const [
      [firstCall],
      [secondCall],
      [brandGridCall]
    ] = handlerRunnerMock.mock.calls;

    expect(brandGridCall).toEqual(expectedBrandGridInput);
  });
});

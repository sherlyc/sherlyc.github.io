import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IBulletItem } from "../../../../../common/__types__/IBulletItem";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IBrandHandlerInput } from "../../__types__/IBrandHandlerInput";
import brandHandler from "./brand";
import { IBulletList } from "../../../../../common/__types__/IBulletList";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { Logo } from "../../../../../common/Logo";
import { BrandGridPositions } from "../../__types__/IBrandGridHandlerInput";
import { first } from "rxjs/operators";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Network Top Stories Handler", () => {
  const params: IParams = { apiRequestId: "123" };
  const totalArticles = 5;

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

  const fakeBulletItem: IBulletItem = {
    id: "1",
    strapName: "Editor's Picks",
    linkText: "Headline 1",
    linkUrl: "/link1",
    bulletColor: "purple"
  };

  const fakeBulletList: IBulletList = {
    type: ContentBlockType.BulletList,
    logo: Logo.DominionPost,
    items: [fakeBulletItem, fakeBulletItem]
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve 10 list of articles", async () => {
    const handlerRunnerMock = jest.fn();

    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(totalArticles).fill(fakeArticle)
    );

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };

    handlerRunnerMock.mockResolvedValue([]);
    await brandHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledTimes(10);
  });

  it("should pass 5 articles to column grid first call", async () => {
    const handlerRunnerMock = jest.fn();
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(totalArticles).fill(fakeArticle)
    );

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };

    const fakeColumnGrid = {
      type: HandlerInputType.ColumnGrid,
      content: [
        fakeBulletList,
        fakeBulletList,
        fakeBulletList,
        fakeBulletList,
        fakeBulletList
      ]
    };

    const expectedContent = {
      [BrandGridPositions.ModuleTitle]: [
        {
          type: ContentBlockType.ModuleTitle,
          displayName: "Our Network's Top Stories",
          displayNameColor: "black"
        }
      ],
      [BrandGridPositions.FirstRow]: [fakeColumnGrid],
      [BrandGridPositions.SecondRow]: [fakeColumnGrid]
    };

    handlerRunnerMock.mockResolvedValue(fakeColumnGrid);

    const result = await brandHandler(handlerRunnerMock, input, params);

    const [[firstCall]] = handlerRunnerMock.mock.calls;

    const expectBulletList = expect.objectContaining({
      type: ContentBlockType.BulletList
    });

    expect(firstCall.content[0]).toEqual([
      expectBulletList,
      expectBulletList,
      expectBulletList,
      expectBulletList,
      expectBulletList
    ]);
  });
});

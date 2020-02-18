import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IBulletItem } from "../../../../../common/__types__/IBulletItem";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IBrandHandlerInput } from "../../__types__/IBrandHandlerInput";
import brandHandler from "./brand";
import { Strap } from "../../../strap";
import { bulletItem } from "../../../adapters/article-converter/bullet-item.converter";
import { IBulletList } from "../../../../../common/__types__/IBulletList";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { Logo } from "../../../../../common/Logo";
import { bulletList } from "../../../adapters/article-converter/bullet-list.converter";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/article-converter/bullet-item.converter");
jest.mock("../../../adapters/article-converter/bullet-list.converter");

describe("Network Top Stories Handler", () => {
  const handlerRunnerMock = jest.fn();
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

  it("should retrieve 10 list of articles", async() => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(totalArticles).fill(fakeArticle)
    );

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };

    handlerRunnerMock.mockResolvedValue([]);
    await brandHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledTimes(10);
    expect(getRawArticles).toHaveBeenNthCalledWith(1,
      Strap.EditorPicks,
      totalArticles,
      params
    );
    expect(getRawArticles).toHaveBeenNthCalledWith(10,
      Strap.EditorPicks,
      totalArticles,
      params
    );
  });

  it("should pass the correct input to next handler",  async() => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(totalArticles).fill(fakeArticle)
    );
    (bulletItem as jest.Mock).mockReturnValue(fakeBulletItem);
    (bulletList as jest.Mock).mockReturnValue(fakeBulletList);

    const fakeResult = {};
    handlerRunnerMock.mockResolvedValueOnce(fakeResult);

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand,
    };

    const result = await brandHandler(handlerRunnerMock, input, params);

    const [
      [firstColumnGridCall],
      [secondColumnGridCall],
      [networkTopStoriesGridCall],
    ] = handlerRunnerMock.mock.calls;

    const networkTopStoriesGridHandlerInput = {
      type: HandlerInputType.BrandGrid,
      content: new Array(8).fill(fakeBulletItem)
    };
   // expect(firstColumnGridCall).toEqual(networkTopStoriesGridHandlerInput);

    console.log("firstColumnGridCall", JSON.stringify(firstColumnGridCall));
    console.log("secondColumnGridCall", JSON.stringify(secondColumnGridCall));
    console.log("networkTopStoriesGridCall", JSON.stringify(networkTopStoriesGridCall));
    console.log("network top stories grid handler input", JSON.stringify(networkTopStoriesGridHandlerInput));

  });
});

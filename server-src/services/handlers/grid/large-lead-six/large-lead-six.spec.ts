import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { ISixImageHandlerInput } from "../../__types__/ISixImageHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import largeLeadSixHandler from "../large-lead-six/large-lead-six";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Large lead six", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const article: IRawArticle = {
    id: "1",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    defconSrc: null,
    imageSrc: "1.jpg",
    imageSrcSet: "1.jpg 1w",
    strapImageSrc: "strap1.jpg",
    strapImageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };
  const strapName = "fakeStrapName";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(new Array(6).fill(article));
    const sourceId = "sourceId" as Strap;
    const input: ISixImageHandlerInput = {
      type: HandlerInputType.SixImage,
      displayName: "FakeName",
      displayNameColor: "FakeColor",
      strapName,
      sourceId
    };

    await largeLeadSixHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(sourceId, 6, params);
  });
});

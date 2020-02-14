import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { Strap } from "../../../strap";
import sixImageHandler from "../six-image/six-image";
import { ISixImageHandlerInput } from "../../__types__/ISixImageHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  ISixImageGridHandlerInput,
  SixImageGridHandlerPositions
} from "../../__types__/ISixImageGridHandlerInput";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";
import { IImageLinkUnit } from "../../../../../common/__types__/IImageLinkUnit";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../utils/logger");

describe("Six image", () => {
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
    headlineFlags: [],
    sixteenByNineSrc: null
  };
  const strapName = "fakeStrapName";
  const imageLinkUnit: IImageLinkUnit = {
    type: ContentBlockType.ImageLinkUnit,
    id: "1",
    strapName,
    indexHeadline: "Headline 1",
    title: "Title One",
    linkUrl: "/link1",
    imageSrc: "strap1.jpg",
    imageSrcSet: "strap1.jpg 1w",
    headlineFlags: []
  };
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve articles by source id and limit", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(new Array(6).fill(article));
    const sourceId = "sourceId" as Strap;
    const input: ISixImageHandlerInput = {
      type: HandlerInputType.SixImage,
      displayName: "FakeName",
      displayNameColor: "FakeColor",
      strapName,
      sourceId
    };

    await sixImageHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(sourceId, 6, params);
  });

  it("should provide correct inputs to grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(new Array(6).fill(article));

    const input: ISixImageHandlerInput = {
      type: HandlerInputType.SixImage,
      displayName: "FakeName",
      displayNameColor: "FakeColor",
      strapName,
      sourceId: Strap.MidStrip
    };

    const expected: ISixImageGridHandlerInput = {
      type: HandlerInputType.SixImageGrid,
      content: {
        [SixImageGridHandlerPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName: input.displayName,
            displayNameColor: input.displayNameColor
          }
        ],
        [SixImageGridHandlerPositions.FirstRowLeft]: [imageLinkUnit],
        [SixImageGridHandlerPositions.FirstRowMiddle]: [imageLinkUnit],
        [SixImageGridHandlerPositions.FirstRowRight]: [imageLinkUnit],
        [SixImageGridHandlerPositions.SecondRowLeft]: [imageLinkUnit],
        [SixImageGridHandlerPositions.SecondRowMiddle]: [imageLinkUnit],
        [SixImageGridHandlerPositions.SecondRowRight]: [imageLinkUnit],
        [SixImageGridHandlerPositions.BigRight]: [
          {
            type: ContentBlockType.StickyContainer,
            items: [basicAdUnit]
          }
        ]
      }
    };

    await sixImageHandler(handlerRunnerMock, input, params);

    expect(handlerRunnerMock).toHaveBeenCalledWith(expected, params);
  });
});

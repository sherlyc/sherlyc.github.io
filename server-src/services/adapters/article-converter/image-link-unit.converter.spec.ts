import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { imageLinkUnit } from "./image-link-unit.converter";
import { IImageLinkUnit } from "../../../../common/__types__/IImageLinkUnit";

describe("Image Link Unit", () => {
  it("should convert", () => {
    const fakeArticle: IRawArticle = {
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

    const fakeStrapName = "fakeStrapName";

    const result = imageLinkUnit(fakeArticle, fakeStrapName);

    const expected: IImageLinkUnit = {
      type: ContentBlockType.ImageLinkUnit,
      id: "1",
      strapName: "fakeStrapName",
      indexHeadline: "Headline 1",
      title: "Title One",
      linkUrl: "/link1",
      imageSrc: "strap1.jpg",
      imageSrcSet: "strap1.jpg 1w",
      headlineFlags: []
    };

    expect(result).toEqual(expected);
  });
});

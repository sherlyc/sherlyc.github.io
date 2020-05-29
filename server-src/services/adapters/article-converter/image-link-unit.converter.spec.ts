import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { imageLinkUnit } from "./image-link-unit.converter";
import { IImageLinkUnit } from "../../../../common/__types__/IImageLinkUnit";
import { ImageLayoutType } from "../../../../common/__types__/ImageLayoutType";

describe("Image Link Unit", () => {
  const strapName = "strapName";
  const color = "blue";

  const rawArticle: IRawArticle = {
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
    sixteenByNineSrc: "sixteenByNine.jpg",
    identifier: "Identifier",
    category: "National",
    categoryUrl: "/coronavirus/"
  };

  const expected: IImageLinkUnit = {
    type: ContentBlockType.ImageLinkUnit,
    id: "1",
    strapName,
    indexHeadline: "Headline 1",
    title: "Title One",
    linkUrl: "/link1",
    imageSrc: "strap1.jpg",
    imageSrcSet: "strap1.jpg 1w",
    headlineFlags: [],
    introText: "Intro 1",
    lastPublishedTime: 1,
    identifier: "Identifier",
    layout: ImageLayoutType.default
  };

  it("should convert", () => {
    expect(
      imageLinkUnit(rawArticle, strapName, ImageLayoutType.default)
    ).toEqual(
      expect.objectContaining({
        ...expected,
        layout: ImageLayoutType.default
      })
    );
  });

  it("should convert module layout", () => {
    expect(
      imageLinkUnit(rawArticle, strapName, ImageLayoutType.module)
    ).toEqual(
      expect.objectContaining({
        ...expected,
        imageSrc: "sixteenByNine.jpg",
        layout: ImageLayoutType.module
      })
    );
  });

  it("should convert identifierColor", () => {
    expect(
      imageLinkUnit(rawArticle, strapName, ImageLayoutType.default, color)
    ).toEqual(
      expect.objectContaining({
        ...expected,
        identifierColor: color
      })
    );
  });
});

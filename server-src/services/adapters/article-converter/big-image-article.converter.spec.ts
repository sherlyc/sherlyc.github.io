import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBigImageArticleUnit } from "../../../../common/__types__/IBigImageArticleUnit";
import { ImageLayoutType } from "../../../../common/__types__/ImageLayoutType";
import { IRawArticle } from "../__types__/IRawArticle";
import { bigImageArticleUnit } from "./big-image-article.converter";

describe("big image article", () => {
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
    sixteenByNineSrc: "sixteenByNine.jpg",
    portraitImageSrc: "portraitImageSrc.jpg",
    identifier: "identifier",
    category: "National",
    categoryUrl: "/coronavirus/"
  };

  const fakeStrapName = "fakeStrapName";

  const expected: IBigImageArticleUnit = {
    type: ContentBlockType.BigImageArticleUnit,
    id: "1",
    strapName: "fakeStrapName",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    imageSrc: "strap1.jpg",
    imageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: [],
    layout: ImageLayoutType.default,
    identifier: "identifier",
    identifierColor: undefined
  };

  it("should convert", () => {
    expect(bigImageArticleUnit(fakeArticle, fakeStrapName)).toEqual(
      expect.objectContaining(expected)
    );
  });

  it("should convert module layout", () => {
    expect(
      bigImageArticleUnit(fakeArticle, fakeStrapName, ImageLayoutType.module)
    ).toEqual(
      expect.objectContaining({
        ...expected,
        imageSrc: "sixteenByNine.jpg",
        layout: ImageLayoutType.module
      })
    );
  });

  it("sets the pumped flag", () => {
    expect(
      bigImageArticleUnit(
        fakeArticle,
        fakeStrapName,
        ImageLayoutType.module,
        true
      )
    ).toEqual(
      expect.objectContaining({
        ...expected,
        imageSrc: "sixteenByNine.jpg",
        layout: ImageLayoutType.module,
        pumped: true
      })
    );
  });

  it("sets the identifier color", () => {
    expect(
      bigImageArticleUnit(
        fakeArticle,
        fakeStrapName,
        ImageLayoutType.default,
        false,
        "black"
      )
    ).toEqual(
      expect.objectContaining({
        ...expected,
        identifierColor: "black"
      })
    );
  });
});

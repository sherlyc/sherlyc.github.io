import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  BigImageArticleUnitLayout,
  IBigImageArticleUnit
} from "../../../../common/__types__/IBigImageArticleUnit";
import { IRawArticle } from "../__types__/IRawArticle";
import { bigImageArticleUnit } from "./big-image-article.converter";

describe("bit image article", () => {
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
    sixteenByNineSrc: "sixteenByNine.jpg"
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
    layout: BigImageArticleUnitLayout.default
  };

  it("should convert", () => {
    expect(bigImageArticleUnit(fakeArticle, fakeStrapName)).toEqual(expected);
  });

  it("should convert module layout", () => {
    expect(
      bigImageArticleUnit(
        fakeArticle,
        fakeStrapName,
        BigImageArticleUnitLayout.module
      )
    ).toEqual({
      ...expected,
      imageSrc: "sixteenByNine.jpg",
      layout: BigImageArticleUnitLayout.module
    });
  });
});

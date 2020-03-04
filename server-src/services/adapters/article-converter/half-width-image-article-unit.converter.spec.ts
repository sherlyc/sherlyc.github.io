import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { halfWidthImageArticleUnit } from "./half-width-image-article-unit.converter";
import { IHalfWidthImageArticleUnit } from "../../../../common/__types__/IHalfWidthImageArticleUnit";

describe("half width image article unit", () => {
  const fakeStrapName = "fakeStrapName";
  const color = "blue";
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
    sixteenByNineSrc: null,
    identifier: undefined
  };
  const expected: IHalfWidthImageArticleUnit = {
    type: ContentBlockType.HalfWidthImageArticleUnit,
    id: "1",
    strapName: "fakeStrapName",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    imageSrc: "strap1.jpg",
    imageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };

  it("should convert", () => {
    const result = halfWidthImageArticleUnit(fakeArticle, fakeStrapName);
    expect(result).toEqual(expected);
  });

  it("should map identifier color", () => {
    const result = halfWidthImageArticleUnit(fakeArticle, fakeStrapName, color);
    expect(result).toEqual({
      ...expected,
      identifierColor: color
    });
  });
});

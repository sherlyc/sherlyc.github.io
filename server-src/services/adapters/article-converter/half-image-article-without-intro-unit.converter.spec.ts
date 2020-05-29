import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IHalfImageArticleWithoutIntroUnit } from "../../../../common/__types__/IHalfImageArticleWithoutIntroUnit";
import { IRawArticle } from "../__types__/IRawArticle";
import { halfImageArticleWithoutIntroUnit } from "./half-image-article-without-intro-unit.converter";

describe("Half image article without intro unit", () => {
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
    sixteenByNineSrc: "sixteenByNine.jpg",
    category: "National",
    categoryUrl: "/coronavirus/"
  };
  const expected: IHalfImageArticleWithoutIntroUnit = {
    type: ContentBlockType.HalfImageArticleWithoutIntroUnit,
    id: "1",
    strapName: "fakeStrapName",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    imageSrc: "sixteenByNine.jpg",
    lastPublishedTime: 1,
    headlineFlags: [],
    imageSrcSet: "1.jpg 1w",
    identifier: undefined
  };
  it("should convert", () => {
    const result = halfImageArticleWithoutIntroUnit(fakeArticle, fakeStrapName);

    expect(result).toEqual(expected);
  });

  it("should map identifier color", () => {
    const result = halfImageArticleWithoutIntroUnit(
      fakeArticle,
      fakeStrapName,
      color
    );

    expect(result).toEqual({
      ...expected,
      identifierColor: color
    });
  });
});

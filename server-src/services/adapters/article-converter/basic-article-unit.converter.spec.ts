import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import { IRawArticle } from "../__types__/IRawArticle";
import { basicArticleUnit } from "./basic-article-unit.converter";

describe("basic article unit", () => {
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
      sixteenByNineSrc: null,
      portraitImageSrc: null,
      category: "National",
      categoryUrl: "/coronavirus/"
    };

    const fakeStrapName = "fakeStrapName";

    const result = basicArticleUnit(fakeArticle, fakeStrapName);

    const expected: IBasicArticleUnit = {
      type: ContentBlockType.BasicArticleUnit,
      id: "1",
      strapName: "fakeStrapName",
      indexHeadline: "Headline 1",
      title: "Title One",
      introText: "Intro 1",
      linkUrl: "/link1",
      imageSrc: "1.jpg",
      imageSrcSet: "1.jpg 1w",
      lastPublishedTime: 1,
      headlineFlags: []
    };

    expect(result).toEqual(expected);
  });
});

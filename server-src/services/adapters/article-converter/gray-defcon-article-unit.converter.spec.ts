import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { grayDefconArticleUnit } from "./gray-defcon-article-unit.converter";
import { IGrayDefconArticleUnit } from "../../../../common/__types__/IGrayDefconArticleUnit";

describe("gray defcon article unit", () => {
  it("should convert", () => {
    const fakeArticle: IRawArticle = {
      id: "1",
      indexHeadline: "Headline 1",
      title: "Title One",
      introText: "Intro 1",
      linkUrl: "/link1",
      defconSrc: "defcon.jpg",
      imageSrc: "1.jpg",
      imageSrcSet: "1.jpg 1w",
      strapImageSrc: "strap1.jpg",
      strapImageSrcSet: "strap1.jpg 1w",
      lastPublishedTime: 1,
      headlineFlags: [],
      sixteenByNineSrc: null
    };

    const fakeStrapName = "fakeStrapName";

    const result = grayDefconArticleUnit(fakeArticle, fakeStrapName);

    const expected: IGrayDefconArticleUnit = {
      type: ContentBlockType.GrayDefconArticleUnit,
      id: "1",
      strapName: "fakeStrapName",
      indexHeadline: "Headline 1",
      title: "Title One",
      introText: "Intro 1",
      linkUrl: "/link1",
      imageSrc: "defcon.jpg",
      lastPublishedTime: 1,
      headlineFlags: []
    };

    expect(result).toEqual(expected);
  });
});

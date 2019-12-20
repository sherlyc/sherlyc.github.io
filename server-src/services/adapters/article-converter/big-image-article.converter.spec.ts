import { bigImageArticleUnit } from "./big-image-article.converter";
import { IRawArticle } from "../__types__/IRawArticle";
import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBigImageArticleUnit } from "../../../../common/__types__/IBigImageArticleUnit";

describe("bit image article", () => {
  it("should work convert", () => {
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
      headlineFlags: []
    };

    const fakeStrapName = "fakeStrapName";

    const result = bigImageArticleUnit(fakeArticle, fakeStrapName);

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
      headlineFlags: []
    };

    expect(result).toEqual(expected);
  });
});

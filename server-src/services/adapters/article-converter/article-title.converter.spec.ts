import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { articleTitle } from "./article-title.converter";
import { IArticleTitle } from "../../../../common/__types__/IArticleTitle";

describe("article title converter", () => {
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
      identifier: "identifier"
    };

    const fakeStrapName = "fakeStrapName";

    const result = articleTitle(fakeArticle, fakeStrapName, true);

    const expected: IArticleTitle = {
      type: ContentBlockType.ArticleTitle,
      id: "1",
      strapName: "fakeStrapName",
      indexHeadline: "Headline 1",
      title: "Title One",
      lastPublishedTime: 1,
      linkUrl: "/link1",
      headlineFlags: [],
      showTimestamp: true
    };

    expect(result).toEqual(expected);
  });
});

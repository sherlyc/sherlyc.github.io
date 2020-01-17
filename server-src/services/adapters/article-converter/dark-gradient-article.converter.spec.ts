import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { darkGradientArticle } from "./dark-gradient-article.converter";
import { IDarkGradientArticle } from "../../../../common/__types__/IDarkGradientArticle";

describe("dark gradient article", () => {
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
      headlineFlags: []
    };

    const fakeStrapName = "fakeStrapName";

    const result = darkGradientArticle(fakeArticle, fakeStrapName);

    const expected: IDarkGradientArticle = {
      type: ContentBlockType.DarkGradientArticle,
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

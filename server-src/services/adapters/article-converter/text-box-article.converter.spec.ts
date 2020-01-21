import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { textBoxArticle } from "./text-box-article.converter";
import { ITextBoxArticle } from "../../../../common/__types__/ITextBoxArticle";

describe("text box article", () => {
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

    const result = textBoxArticle(fakeArticle, fakeStrapName);

    const expected: ITextBoxArticle = {
      type: ContentBlockType.TextBoxArticle,
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

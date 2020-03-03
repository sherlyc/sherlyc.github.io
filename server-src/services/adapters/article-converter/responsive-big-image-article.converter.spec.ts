import { responsiveBigImageArticleUnit } from "./responsive-big-image-article.converter";
import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IResponsiveBigImageArticleUnit } from "../../../../common/__types__/IResponsiveBigImageArticleUnit";

describe("responsive big image article", () => {
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

    const result = responsiveBigImageArticleUnit(fakeArticle, fakeStrapName);

    const expected: IResponsiveBigImageArticleUnit = {
      type: ContentBlockType.ResponsiveBigImageArticle,
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

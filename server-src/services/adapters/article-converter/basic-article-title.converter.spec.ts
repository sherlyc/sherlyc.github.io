import { basicArticleTitleUnit } from "./basic-article-title.converter";
import { IRawArticle } from "../__types__/IRawArticle";
import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { responsiveBigImageArticleUnit } from "./responsive-big-image-article.converter";

describe("basic article title converter", () => {
  const fakeStrapName = "fakeStrapName";
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
  const expected: IBasicArticleTitleUnit = {
    type: ContentBlockType.BasicArticleTitleUnit,
    id: "1",
    strapName: "fakeStrapName",
    indexHeadline: "Headline 1",
    title: "Title One",
    lastPublishedTime: 1,
    linkUrl: "/link1",
    headlineFlags: [],
    identifier: "identifier",
    identifierColor: undefined
  };

  it("should convert", () => {
    const result = basicArticleTitleUnit(fakeArticle, fakeStrapName);

    expect(result).toEqual(expected);
  });

  it("set the identifier color", () => {
    expect(basicArticleTitleUnit(fakeArticle, fakeStrapName, "yellow")).toEqual(
      {
        ...expected,
        identifierColor: "yellow"
      }
    );
  });
});

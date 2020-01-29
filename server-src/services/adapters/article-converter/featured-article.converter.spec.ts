import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { featuredArticle } from "./featured-article.converter";
import { IFeaturedArticle } from "../../../../common/__types__/IFeaturedArticle";

describe("Featured Article", () => {
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
      sixteenByNineSrc: "sixteenByNineSrc.jpg"
    };

    const strapName = "strapName";
    const boxColor = "red";
    const textColor = "white";
    const applyGradient = true;

    const result = featuredArticle(
      fakeArticle,
      strapName,
      textColor,
      boxColor,
      applyGradient
    );

    const expected: IFeaturedArticle = {
      type: ContentBlockType.FeaturedArticle,
      id: "1",
      strapName,
      indexHeadline: "Headline 1",
      title: "Title One",
      introText: "Intro 1",
      linkUrl: "/link1",
      imageSrc: "sixteenByNineSrc.jpg",
      imageSrcSet: "1.jpg 1w",
      lastPublishedTime: 1,
      headlineFlags: [],
      boxColor,
      textColor,
      applyGradient
    };

    expect(result).toEqual(expected);
  });
});
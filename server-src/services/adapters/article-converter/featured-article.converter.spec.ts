import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IFeaturedArticle } from "../../../../common/__types__/IFeaturedArticle";
import { AspectRatio } from "../../../../common/AspectRatio";
import { IRawArticle } from "../__types__/IRawArticle";
import { featuredArticle } from "./featured-article.converter";

describe("Featured Article", () => {
  const strapName = "strapName";
  const boxColor = "red";
  const textColor = "white";
  const applyGradient = true;
  const pumped = true;
  const identifierColor = "black";
  const imageAspectRatio = AspectRatio.SixteenByNine;

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
    sixteenByNineSrc: "sixteenByNineSrc.jpg",
    identifier: "identifier"
  };

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
    identifier: "identifier",
    boxColor,
    textColor,
    applyGradient,
    pumped,
    identifierColor,
    imageAspectRatio
  };

  it("should convert", () => {
    const result = featuredArticle(
      fakeArticle,
      strapName,
      textColor,
      boxColor,
      applyGradient,
      pumped,
      identifierColor,
      imageAspectRatio
    );

    expect(result).toEqual(expected);
  });
});

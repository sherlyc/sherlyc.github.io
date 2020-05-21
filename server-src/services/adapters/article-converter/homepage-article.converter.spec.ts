import { IRawArticle } from "../__types__/IRawArticle";
import {
  IHomepageArticle,
  Orientation
} from "../../../../common/__types__/IHomepageArticle";
import { homepageArticle } from "./homepage-article.converter";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

describe("Homepage Article", () => {
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

  const expected: IHomepageArticle = {
    analytics: {
      strapName: "strapName",
      title: "Title One"
    },
    category: "identifier",
    display: {
      desktop: Orientation.Landscape,
      mobile: Orientation.Landscape,
      tablet: Orientation.Portrait
    },
    headline: "Headline 1",
    headlineFlags: [],
    id: "1",
    imageSrc: "1.jpg",
    introText: "Intro 1",
    lastPublishedTime: 1,
    linkUrl: "/link1",
    type: ContentBlockType.HomepageArticle
  };

  it("should convert", () => {
    const result = homepageArticle(fakeArticle, "strapName", {
      desktop: Orientation.Landscape,
      mobile: Orientation.Landscape,
      tablet: Orientation.Portrait
    });

    expect(result).toEqual(expected);
  });

  it("should convert when not showing intro text and image", () => {
    const result = homepageArticle(
      fakeArticle,
      "strapName",
      {
        desktop: Orientation.Landscape,
        mobile: Orientation.Landscape,
        tablet: Orientation.Portrait
      },
      false,
      false
    );

    expect(result).toEqual({
      ...expected,
      introText: undefined,
      imageSrc: undefined
    });
  });
});

import { AspectRatio } from "../../../../common/AspectRatio";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  HomepageHighlightArticleVariation,
  IHomepageHighlightArticle
} from "../../../../common/__types__/IHomepageHighlightArticle";
import { IRawArticle } from "../__types__/IRawArticle";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";
import { homepageHighlightArticle } from "./homepage-highlight-article.converter";

describe("Homepage Highlight Article", () => {
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
    portraitImageSrc: "portraitImageSrc.jpg",
    identifier: "identifier",
    category: "National",
    categoryUrl: "/coronavirus/",
    byline: "David Beckham"
  };

  const expected: IHomepageHighlightArticle = {
    analytics: {
      strapName: "strapName",
      title: "Title One"
    },
    category: {
      name: "National",
      url: "/coronavirus/"
    },
    byline: "David Beckham",
    headline: "Headline 1",
    headlineFlags: [],
    id: "1",
    color: AccentColor.CuriousBlue,
    image: {
      mobile: {
        src: "sixteenByNineSrc.jpg",
        aspectRatio: AspectRatio.SixteenByNine
      },
      tablet: {
        src: "portraitImageSrc.jpg",
        aspectRatio: AspectRatio.SixteenByNine
      },
      desktop: {
        src: "portraitImageSrc.jpg",
        aspectRatio: AspectRatio.OneByOne
      }
    },
    variation: HomepageHighlightArticleVariation.Lead,
    introText: "Intro 1",
    lastPublishedTime: 1,
    linkUrl: "/link1",
    type: ContentBlockType.HomepageHighlightArticle
  };

  it("should convert", () => {
    const result = homepageHighlightArticle(
      fakeArticle,
      "strapName",
      AccentColor.CuriousBlue,
      {
        mobile: {
          variant: JsonFeedImageType.THUMBNAIL_SIXTEEN_BY_NINE,
          aspectRatio: AspectRatio.SixteenByNine
        },
        tablet: {
          variant: JsonFeedImageType.THUMBNAIL_SQUARE,
          aspectRatio: AspectRatio.SixteenByNine
        },
        desktop: {
          variant: JsonFeedImageType.THUMBNAIL_SQUARE,
          aspectRatio: AspectRatio.OneByOne
        }
      },
      HomepageHighlightArticleVariation.Lead,
      true
    );

    expect(result).toEqual(expected);
  });

  it("converts different configurations", () => {
    const result = homepageHighlightArticle(
      fakeArticle,
      "strapName",
      AccentColor.Cyan,
      {},
      HomepageHighlightArticleVariation.Featured,
      false
    );

    expect(result).toEqual({
      ...expected,
      color: AccentColor.Cyan,
      image: {},
      variation: HomepageHighlightArticleVariation.Featured,
      introText: undefined
    });
  });

  it("ignores null image src", () => {
    const result = homepageHighlightArticle(
      { ...fakeArticle, sixteenByNineSrc: null, portraitImageSrc: null },
      "strapName",
      AccentColor.CuriousBlue,
      {
        mobile: {
          variant: JsonFeedImageType.THUMBNAIL_SIXTEEN_BY_NINE,
          aspectRatio: AspectRatio.SixteenByNine
        },
        tablet: {
          variant: JsonFeedImageType.PORTRAIT,
          aspectRatio: AspectRatio.SixteenByNine
        },
        desktop: {
          variant: JsonFeedImageType.PORTRAIT,
          aspectRatio: AspectRatio.OneByOne
        }
      },
      HomepageHighlightArticleVariation.Lead,
      true
    );

    expect(result).toEqual({
      ...expected,
      image: {}
    });
  });
});

import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  HomepageFeaturedArticleVariation,
  IHomepageFeaturedArticle
} from "../../../../common/__types__/IHomepageFeaturedArticle";
import { AspectRatio } from "../../../../common/AspectRatio";
import { IRawArticle } from "../__types__/IRawArticle";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";
import { homepageFeaturedArticle } from "./homepage-featured-article.converter";

describe("Homepage Featured Article", () => {
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
    categoryUrl: "/coronavirus/"
  };

  const expected: IHomepageFeaturedArticle = {
    analytics: {
      strapName: "strapName",
      title: "Title One"
    },
    category: {
      name: "National",
      url: "/coronavirus/"
    },
    headline: "Headline 1",
    headlineFlags: [],
    id: "1",
    color: AccentColor.TopStoriesBlue,
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
    variation: HomepageFeaturedArticleVariation.Lead,
    introText: "Intro 1",
    lastPublishedTime: 1,
    linkUrl: "/link1",
    type: ContentBlockType.HomepageFeaturedArticle
  };

  it("should convert", () => {
    const result = homepageFeaturedArticle(
      fakeArticle,
      "strapName",
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
      HomepageFeaturedArticleVariation.Lead,
      true
    );

    expect(result).toEqual(expected);
  });

  it("should convert different configurations", () => {
    const result = homepageFeaturedArticle(
      fakeArticle,
      "strapName",
      {},
      HomepageFeaturedArticleVariation.Featured,
      false
    );

    expect(result).toEqual({
      ...expected,
      image: {},
      variation: HomepageFeaturedArticleVariation.Featured,
      introText: undefined
    });
  });
});

import { getUnixTime, parseISO } from "date-fns";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { IJsonFeedArticle } from "../__types__/IJsonFeedArticle";
import { IJsonFeedArticleList } from "../__types__/IJsonFeedArticleList";
import { IJsonFeedUrl } from "../__types__/IJsonFeedUrl";
import { IRawArticle } from "../__types__/IRawArticle";
import { JsonFeedAssetType } from "../__types__/JsonFeedAssetType";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";
import { getCategoryUrl, mapToRawArticleList } from "./jsonfeed-mapper";

describe("JsonFeed Mapper", () => {
  const jsonFeedArticle = (): IJsonFeedArticle => ({
    id: 109962196,
    asset_type: JsonFeedAssetType.ARTICLE,
    headline_flags: [],
    sponsored: false,
    path: "/national/109962196/christmas-tree-caltex",
    url:
      "http://www.stuff.co.nz/_json/national/109962196/christmas-tree-caltex",
    section: "National",
    "section-home": "National",
    "section-top-level": "National",
    layout: "landscape-image",
    title:
      "CCTV shows unruly travelling family taking Christmas tree from Auckland Caltex",
    alt_headline: "Not even Christmas is safe",
    isHeadlineOverrideApplied: true,
    datetime_iso8601: "20190116T154002+1300",
    datetime_display: "15:40 16/01/2019",
    byline: "BRAD FLAHIVE",
    source_code: "1national-newsroom",
    source_name: "Stuff",
    intro:
      "An unruly family travelling New Zealand has been causing mayhem for more than a month.",
    alt_intro:
      "Unruly travelling family hit an Auckland Caltex four times. They even took the Christmas tree.",
    body: "<p>Hello</p>",
    images: [],
    videos: [],
    html_assets: [],
    galleries: [],
    identifier: "Article identifier"
  });

  const jsonFeedUrlAsset = (): IJsonFeedUrl => ({
    id: "112150655",
    asset_type: JsonFeedAssetType.URL,
    headline_flags: [],
    sponsored: false,
    alt_headline: "Paving",
    title: "Paving over paradise",
    isHeadlineOverrideApplied: true,
    path: "/national/112150655/url-asset",
    url:
      "https://interactives.stuff.co.nz/2019/04/the-tourist-trap/#section-wS1QFb7arf",
    datetime_display: "00:01 22/04/2019",
    alt_intro:
      "The ancient, beautiful Ōpārara Basin is the subject of development plans.",
    images: [],
    datetime_iso8601: "20190422T000100+1200",
    identifier: "Url Asset Identifier"
  });

  const rawFeedArticle = (article: IJsonFeedArticle): IRawArticle => ({
    id: `${article.id}`,
    indexHeadline: article.alt_headline,
    title: article.title,
    introText: article.alt_intro,
    byline: article.byline,
    linkUrl: article.path,
    defconSrc: null,
    imageSrc: null,
    strapImageSrc: null,
    imageSrcSet: null,
    strapImageSrcSet: null,
    sixteenByNineSrc: null,
    lastPublishedTime: getUnixTime(parseISO(article.datetime_iso8601)),
    headlineFlags: article.headline_flags,
    identifier: article.identifier,
    category: article["section-home"],
    categoryUrl: getCategoryUrl(String(article.id), article.path)
  });

  const rawUrlArticle = (article: IJsonFeedUrl): IRawArticle => ({
    id: `${article.id}`,
    indexHeadline: article.alt_headline,
    title: article.title,
    introText: article.alt_intro,
    linkUrl: article.url,
    defconSrc: null,
    imageSrc: null,
    strapImageSrc: null,
    imageSrcSet: null,
    strapImageSrcSet: null,
    sixteenByNineSrc: null,
    lastPublishedTime: getUnixTime(parseISO(article.datetime_iso8601)),
    headlineFlags: article.headline_flags,
    identifier: article.identifier,
    category: article["section-home"],
    categoryUrl: getCategoryUrl(String(article.id), article.path)
  });

  describe("article asset", () => {
    it("should map json feed article to raw article", () => {
      const feedArticle = jsonFeedArticle();
      const expectedArticle = rawFeedArticle(feedArticle);
      expect(mapToRawArticleList([feedArticle])).toEqual([expectedArticle]);
    });

    it("should map alt_headline to indexHeadline when override is true", () => {
      const expectedHeadline = "Alt headline";

      const feedArticle = jsonFeedArticle();
      feedArticle.isHeadlineOverrideApplied = true;
      feedArticle.alt_headline = expectedHeadline;

      const expectedArticle = rawFeedArticle(feedArticle);
      expectedArticle.indexHeadline = expectedHeadline;

      expect(mapToRawArticleList([feedArticle])).toEqual([expectedArticle]);
    });

    it("should map title to indexHeadline when override is false", () => {
      const expectedTitle = "Title";

      const feedArticle = jsonFeedArticle();
      feedArticle.isHeadlineOverrideApplied = false;
      feedArticle.title = expectedTitle;

      const expectedArticle = rawFeedArticle(feedArticle);
      expectedArticle.indexHeadline = expectedTitle;

      expect(mapToRawArticleList([feedArticle])).toEqual([expectedArticle]);
    });

    it("should map non-empty identifier", () => {
      const identifier = "Identity";
      const feedArticle = {
        ...jsonFeedArticle(),
        identifier
      };

      const [article] = mapToRawArticleList([feedArticle]);

      expect(article.identifier).toEqual(identifier);
    });

    it("should map empty identifier to undefined", () => {
      const feedArticle = {
        ...jsonFeedArticle(),
        identifier: ""
      };

      const [article] = mapToRawArticleList([feedArticle]);

      expect(article.identifier).toEqual(undefined);
    });
  });

  describe("url asset", () => {
    it("should map json feed url asset to raw article", () => {
      const urlAsset = jsonFeedUrlAsset();
      const expectedArticle = rawUrlArticle(urlAsset);
      expect(mapToRawArticleList([urlAsset])).toEqual([expectedArticle]);
    });

    it("should map alt_headline to indexHeadline when override is true", () => {
      const expectedHeadline = "Alt headline";

      const urlAsset = jsonFeedUrlAsset();
      urlAsset.isHeadlineOverrideApplied = true;
      urlAsset.alt_headline = expectedHeadline;

      const expectedArticle = rawUrlArticle(urlAsset);
      expectedArticle.indexHeadline = expectedHeadline;

      expect(mapToRawArticleList([urlAsset])).toEqual([expectedArticle]);
    });

    it("should map title to indexHeadline when override is false", () => {
      const expectedTitle = "Title";

      const urlAsset = jsonFeedUrlAsset();
      urlAsset.isHeadlineOverrideApplied = false;
      urlAsset.title = expectedTitle;

      const expectedArticle = rawUrlArticle(urlAsset);
      expectedArticle.indexHeadline = expectedTitle;

      expect(mapToRawArticleList([urlAsset])).toEqual([expectedArticle]);
    });

    it("should map non-empty identifier", () => {
      const identifier = "Identity";
      const feedArticle = {
        ...jsonFeedUrlAsset(),
        identifier
      };

      const [article] = mapToRawArticleList([feedArticle]);

      expect(article.identifier).toEqual(identifier);
    });

    it("should map empty identifier to undefined", () => {
      const feedArticle = {
        ...jsonFeedUrlAsset(),
        identifier: ""
      };

      const [article] = mapToRawArticleList([feedArticle]);

      expect(article.identifier).toEqual(undefined);
    });
  });

  describe("images", () => {
    it("should handle empty image value", () => {
      const feedArticle = jsonFeedArticle();
      feedArticle.images = [];

      const expected: IRawArticle[] = [rawFeedArticle(feedArticle)];
      Object.values(expected).forEach((expectedArticle: IRawArticle) => {
        expectedArticle.defconSrc = null;
        expectedArticle.imageSrc = null;
        expectedArticle.imageSrcSet = null;
        expectedArticle.strapImageSrc = null;
        expectedArticle.strapImageSrcSet = null;
      });

      expect(mapToRawArticleList([feedArticle])).toEqual(expected);
    });

    it("should return thumbnail image when strap image is not provided", () => {
      const feedArticle = jsonFeedArticle();
      const expectedImageUrl = "www.example.com/thumbnail.180x120.jpg";
      feedArticle.images = [
        {
          id: 63784214,
          datetime_iso8601: "20150818T085547+1200",
          datetime_display: "08:55 18/08/2015",
          creditline: "",
          caption: "x",
          variants: [
            {
              id: 63784214,
              layout: JsonFeedImageType.SMALL_THUMBNAIL,
              src: "www.example.com/thumbnail.90x60.jpg",
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": "www.example.com/thumbnail.90x60.jpg",
                "180x120": expectedImageUrl
              },
              image_type_id: "StuffThumbnail"
            }
          ],
          asset_type: "IMAGE"
        }
      ];

      const [result] = mapToRawArticleList([feedArticle]);

      expect(result.imageSrc).toBe(expectedImageUrl);
    });

    it("should generate image source set", () => {
      const expectedImageSourceSet =
        "www.example.com/thumbnail.90x60.jpg 90w, " +
        "www.example.com/thumbnail.180x120.jpg 180w";

      const feedArticle = jsonFeedArticle();
      feedArticle.images = [
        {
          id: 63784214,
          datetime_iso8601: "20150818T085547+1200",
          datetime_display: "08:55 18/08/2015",
          creditline: "",
          caption: "x",
          variants: [
            {
              id: 63784214,
              layout: JsonFeedImageType.SMALL_THUMBNAIL,
              src: "www.example.com/thumbnail.90x60.jpg",
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": "www.example.com/thumbnail.90x60.jpg",
                "180x120": "www.example.com/thumbnail.180x120.jpg"
              },
              image_type_id: "StuffThumbnail"
            }
          ],
          asset_type: "IMAGE"
        }
      ];

      const [result] = mapToRawArticleList([feedArticle]);

      expect(result.imageSrcSet).toBe(expectedImageSourceSet);
    });

    it("should generate image source set from next image in the same article when first image does not have thumbnail variant", () => {
      const expectedImageSourceSet =
        "www.example.com/thumbnail.90x60.jpg 90w, " +
        "www.example.com/thumbnail.180x120.jpg 180w";

      const feedArticle = jsonFeedArticle();
      feedArticle.images = [
        {
          id: 63784214,
          datetime_iso8601: "20150818T085547+1200",
          datetime_display: "08:55 18/08/2015",
          creditline: "",
          caption: "x",
          variants: [
            {
              id: 63784214,
              layout: JsonFeedImageType.DEFCON_IMAGE,
              src: "www.example.com/defcon.90x60.jpg",
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": "www.example.com/defcon.90x60.jpg",
                "180x120": "www.example.com/defcon.180x120.jpg"
              },
              image_type_id: "Defcon"
            }
          ],
          asset_type: "IMAGE"
        },
        {
          id: 63784214,
          datetime_iso8601: "20150818T085547+1200",
          datetime_display: "08:55 18/08/2015",
          creditline: "",
          caption: "x",
          variants: [
            {
              id: 63784214,
              layout: JsonFeedImageType.SMALL_THUMBNAIL,
              src: "www.example.com/thumbnail.90x60.jpg",
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": "www.example.com/thumbnail.90x60.jpg",
                "180x120": "www.example.com/thumbnail.180x120.jpg"
              },
              image_type_id: "StuffThumbnail"
            }
          ],
          asset_type: "IMAGE"
        }
      ];

      const [result] = mapToRawArticleList([feedArticle]);

      expect(result.imageSrcSet).toBe(expectedImageSourceSet);
    });

    it("should fallback to strap image when defcon image is not provided", () => {
      const feedArticle = jsonFeedArticle();
      const expectedStrapImageSrc =
        "www.example.com/StuffLandscapeThreeByTwo.180x120.jpg";
      feedArticle.images = [
        {
          id: 63784214,
          datetime_iso8601: "20150818T085547+1200",
          datetime_display: "08:55 18/08/2015",
          creditline: "",
          caption: "x",
          variants: [
            {
              id: 63784214,
              layout: JsonFeedImageType.SMALL_THUMBNAIL,
              src: "www.example.com/thumbnail.90x60.jpg",
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": "www.example.com/thumbnail.90x60.jpg",
                "180x120": "www.example.com/thumbnail.180x120.jpg"
              },
              image_type_id: "StuffThumbnail"
            },
            {
              id: 63784214,
              layout: JsonFeedImageType.STRAP_IMAGE,
              src: "www.example.com/StuffLandscapeThreeByTwo.90x60.jpg",
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": "www.example.com/StuffLandscapeThreeByTwo.90x60.jpg",
                "180x120": expectedStrapImageSrc
              },
              image_type_id: "StuffLandscapeThreeByTwo"
            }
          ],
          asset_type: "IMAGE"
        }
      ];

      const [result] = mapToRawArticleList([feedArticle]);

      expect(result.defconSrc).toBe(expectedStrapImageSrc);
    });

    it("should fallback to thumbnail image when defcon image and strap images are not provided", () => {
      const feedArticle = jsonFeedArticle();
      const expectedThumbnailSrc = "www.example.com/StuffThumbnail.180x120.jpg";
      feedArticle.images = [
        {
          id: 63784214,
          datetime_iso8601: "20150818T085547+1200",
          datetime_display: "08:55 18/08/2015",
          creditline: "",
          caption: "x",
          variants: [
            {
              id: 63784214,
              layout: JsonFeedImageType.SMALL_THUMBNAIL,
              src: "www.example.com/StuffThumbnail.90x60.jpg",
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": "www.example.com/StuffThumbnail.90x60.jpg",
                "180x120": expectedThumbnailSrc
              },
              image_type_id: "StuffThumbnail"
            }
          ],
          asset_type: "IMAGE"
        }
      ];
      const data: IJsonFeedArticleList = { stories: [feedArticle] };

      const [result] = mapToRawArticleList(data.stories);

      expect(result.defconSrc).toBe(expectedThumbnailSrc);
    });

    it("should map 16x9 thumbnail image when it is provided", () => {
      const feedArticle = jsonFeedArticle();
      const expected16x9Image = "www.example.com/small_thumbnail.1600x900.jpg";
      feedArticle.images = [
        {
          id: 1,
          datetime_iso8601: "20150818T085547+1200",
          datetime_display: "08:55 18/08/2015",
          creditline: "",
          caption: "x",
          variants: [
            {
              id: 63784214,
              layout: JsonFeedImageType.SMALL_THUMBNAIL_SIXTEEN_BY_NINE,
              src: expected16x9Image,
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "1600x900": expected16x9Image,
                "320x180": "www.example.com/small_thumbnail.320x180.jpg"
              },
              image_type_id: "StuffThumbnailSixteenByNine"
            }
          ],
          asset_type: "IMAGE"
        }
      ];
      const data: IJsonFeedArticleList = { stories: [feedArticle] };

      const [result] = mapToRawArticleList(data.stories);

      expect(result.sixteenByNineSrc).toBe(expected16x9Image);
    });

    it("should fallback to strap image if sixteen by nine is not provided", () => {
      const feedArticle = jsonFeedArticle();
      const expectedStrapImage = "www.example.com/strap.180x120.jpg";
      feedArticle.images = [
        {
          id: 1,
          datetime_iso8601: "20150818T085547+1200",
          datetime_display: "08:55 18/08/2015",
          creditline: "",
          caption: "x",
          variants: [
            {
              id: 63784214,
              layout: JsonFeedImageType.SMALL_THUMBNAIL,
              src: "www.example.com/thumbnail.90x60.jpg",
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": "www.example.com/thumbnail.90x60.jpg",
                "180x120": "www.example.com/thumbnail.180x120.jpg"
              },
              image_type_id: "StuffThumbnail"
            },
            {
              id: 63784214,
              layout: JsonFeedImageType.STRAP_IMAGE,
              src: expectedStrapImage,
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": "www.example.com/strap.90x60.jpg",
                "180x120": expectedStrapImage
              },
              image_type_id: "StuffLandscapeThreeByTwo"
            }
          ],
          asset_type: "IMAGE"
        }
      ];

      const [result] = mapToRawArticleList([feedArticle]);

      expect(result.sixteenByNineSrc).toBe(expectedStrapImage);
    });

    it("should get largest rendition", () => {
      const feedArticle = jsonFeedArticle();
      const expectedImage = "www.example.com/thumbnail.180x120.jpg";
      feedArticle.images = [
        {
          id: 1,
          datetime_iso8601: "20150818T085547+1200",
          datetime_display: "08:55 18/08/2015",
          creditline: "",
          caption: "x",
          variants: [
            {
              id: 63784214,
              layout: JsonFeedImageType.SMALL_THUMBNAIL,
              src: "www.example.com/thumbnail.90x60.jpg",
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": "www.example.com/thumbnail.90x60.jpg",
                "180x120": expectedImage
              },
              image_type_id: "StuffThumbnail"
            }
          ],
          asset_type: "IMAGE"
        }
      ];

      const [result] = mapToRawArticleList([feedArticle]);

      expect(result.imageSrc).toBe(expectedImage);
    });

    it("should fallback to image src if there is no rendition", () => {
      const feedArticle = jsonFeedArticle();
      const expectedImage = "www.example.com/thumbnail.90x60.jpg";
      feedArticle.images = [
        {
          id: 1,
          datetime_iso8601: "20150818T085547+1200",
          datetime_display: "08:55 18/08/2015",
          creditline: "",
          caption: "x",
          variants: [
            {
              id: 63784214,
              layout: JsonFeedImageType.SMALL_THUMBNAIL,
              src: expectedImage,
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {},
              image_type_id: "StuffThumbnail"
            }
          ],
          asset_type: "IMAGE"
        }
      ];

      const [result] = mapToRawArticleList([feedArticle]);

      expect(result.imageSrc).toBe(expectedImage);
    });
  });

  describe("headline flags", () => {
    it("should include sponsored flag in headline flags when sponsored field is true", () => {
      const feedArticle = jsonFeedArticle();
      feedArticle.sponsored = true;
      feedArticle.headline_flags = [HeadlineFlags.PHOTO];

      const [result] = mapToRawArticleList([feedArticle]);
      const { headlineFlags } = result;

      expect(headlineFlags.includes(HeadlineFlags.PHOTO)).toBeTruthy();
      expect(headlineFlags.includes(HeadlineFlags.SPONSORED)).toBeTruthy();
    });

    it("should not include sponsored flag in headline flags when sponsored field is false", () => {
      const feedArticle = jsonFeedArticle();
      feedArticle.sponsored = false;
      feedArticle.headline_flags = [HeadlineFlags.VIDEO];

      const [result] = mapToRawArticleList([feedArticle]);
      const { headlineFlags } = result;

      expect(headlineFlags.includes(HeadlineFlags.VIDEO)).toBeTruthy();
      expect(headlineFlags.includes(HeadlineFlags.SPONSORED)).toBeFalsy();
    });
  });

  describe("get category Url", () => {
    it.each`
      articleId      | path                                                                                        | categoryUrl
      ${"115457620"} | ${"/national/115457620/czech-couples-decisionmaking-on-deadly-great-walk-tramp-criticised"} | ${"/national/"}
      ${"300009374"} | ${"/national/health/300009374/recap-jacinda-ardern"}                                        | ${"/national/health/"}
      ${"999999999"} | ${"/national/health/coronavirus/999999999/recap-jacinda-ardern"}                            | ${"/national/health/coronavirus/"}
      ${"888899333"} | ${"/life-style/homed/celebrity-homes/random/888899333/worst-dressed-looking-back"}          | ${"/life-style/homed/celebrity-homes/random/"}
    `("returns $categoryUrl", ({ articleId, path, categoryUrl }) => {
      expect(getCategoryUrl(articleId, path)).toEqual(categoryUrl);
    });
  });
});

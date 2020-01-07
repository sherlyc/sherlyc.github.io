import { mapToRawArticleList } from "./jsonfeed-mapper";
import { IJsonFeedArticleList } from "../__types__/IJsonFeedArticleList";
import { IRawArticle } from "../__types__/IRawArticle";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";
import * as moment from "moment";
import { IJsonFeedArticle } from "../__types__/IJsonFeedArticle";
import { JsonFeedAssetType } from "../__types__/JsonFeedAssetType";
import { IJsonFeedUrl } from "../__types__/IJsonFeedUrl";

describe("JsonFeed Mapper", () => {
  const jsonFeedArticle = (): IJsonFeedArticle => ({
    id: 109962196,
    asset_type: JsonFeedAssetType.ARTICLE,
    headline_flags: [],
    sponsored: false,
    path: "/national/123123123/christmas-tree-caltex",
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
    galleries: []
  });

  const jsonFeedUrlAsset = (): IJsonFeedUrl => ({
    id: "112150655",
    asset_type: JsonFeedAssetType.URL,
    headline_flags: [],
    sponsored: false,
    alt_headline: "Paving",
    title: "Paving over paradise",
    isHeadlineOverrideApplied: true,
    url:
      "https://interactives.stuff.co.nz/2019/04/the-tourist-trap/#section-wS1QFb7arf",
    datetime_display: "00:01 22/04/2019",
    alt_intro:
      "The ancient, beautiful Ōpārara Basin is the subject of development plans.",
    images: [],
    datetime_iso8601: "20190422T000100+1200"
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
    lastPublishedTime: moment(article.datetime_iso8601).unix(),
    headlineFlags: article.headline_flags
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
    lastPublishedTime: moment(article.datetime_iso8601).unix(),
    headlineFlags: article.headline_flags
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
      const thumbnailImageUrl = "www.example.com/thumbnail.90x60.jpg";
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
              src: thumbnailImageUrl,
              media_type: "Photo",
              width: "90",
              height: "60",
              urls: {
                "90x60": thumbnailImageUrl,
                "180x120": "www.example.com/thumbnail.180x120.jpg"
              },
              image_type_id: "StuffThumbnail"
            }
          ],
          asset_type: "IMAGE"
        }
      ];

      const [result] = mapToRawArticleList([feedArticle]);

      expect(result.imageSrc).toBe(thumbnailImageUrl);
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
      const expectedDefconSrc = "www.example.com/defcon.90x60.jpg";
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
              src: expectedDefconSrc,
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
        }
      ];

      const [result] = mapToRawArticleList([feedArticle]);

      expect(result.defconSrc).toBe(expectedDefconSrc);
    });

    it("should fallback to thumbnail image when defcon image and strap images are not provided", () => {
      const feedArticle = jsonFeedArticle();
      const expectedDefconSrc = "www.example.com/defcon.90x60.jpg";
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
              src: expectedDefconSrc,
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
        }
      ];
      const data: IJsonFeedArticleList = { stories: [feedArticle] };

      const [result] = mapToRawArticleList(data.stories);

      expect(result.defconSrc).toBe(expectedDefconSrc);
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
});

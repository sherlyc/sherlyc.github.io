import { AccentColor } from "../../../../common/__types__/AccentColor";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { IRawArticle } from "../__types__/IRawArticle";
import { homepageArticleContent } from "./homepage-article-content.converter";

const fakeArticles = (ids: number[]) =>
  ids.map(
    (id) =>
      ({
        id: `${id}`,
        indexHeadline: `${id} headline`,
        title: `${id} title`,
        introText: `${id} introText`,
        byline: `${id} byline`,
        linkUrl: `${id} linkUrl`,
        lastPublishedTime: id,
        headlineFlags: [HeadlineFlags.PHOTO],
        defconSrc: `${id} defconSrc`,
        sixteenByNineSrc: `${id} sixteenByNineSrc`,
        category: "National",
        categoryUrl: "/national/"
      } as IRawArticle)
  );

const expectedArticles = (ids: number[]) =>
  ids.map(
    (id) =>
      ({
        id: `${id}`,
        headline: `${id} headline`,
        title: `${id} title`,
        introText: `${id} introText`,
        byline: `${id} byline`,
        linkUrl: `${id} linkUrl`,
        lastPublishedTime: id,
        headlineFlags: [HeadlineFlags.PHOTO],
        image: {
          defcon: `${id} defconSrc`,
          sixteenByNine: `${id} sixteenByNineSrc`
        },
        color: AccentColor.TopStoriesBlue,
        category: {
          name: "National",
          url: "/national/"
        }
      } as IHomepageArticleContent)
  );

describe("Convert homepage article content from raw article", () => {
  it("should convert", async () => {
    const homepageArticles = fakeArticles([1, 2, 3]).map(
      homepageArticleContent
    );

    expect(homepageArticles).toEqual(expectedArticles([1, 2, 3]));
  });
});

import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { createPartnerContent } from "./partner-content";
import { IBrandListConfig } from "../../__types__/IBrandConfig";
import { Logo } from "../../../../../common/Logo";
import { Section } from "../../../section";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { HeadlineFlags } from "../../../../../common/HeadlineFlags";
import { IHomepageArticleContent } from "../../../../../common/__types__/IHomepageArticleContent";

jest.mock("../../../adapters/article-retriever/article-retriever");

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
        identifier: `${id} identifier`,
        defconSrc: `${id} defconSrc`,
        sixteenByNineSrc: `${id} sixteenByNineSrc`
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
        identifier: `${id} identifier`,
        image: {
          defcon: `${id} defconSrc`,
          sixteenByNine: `${id} sixteenByNineSrc`
        }
      } as IHomepageArticleContent)
  );

describe("Create Partner Content", () => {
  const params: IParams = { apiRequestId: "123" };
  const config: IBrandListConfig = {
    logo: Logo.DominionPost,
    logoLink: "/" + Section.DominionPost,
    bulletColor: "red",
    sourceId: Strap.DominionPost
  };
  it("should retrieve number of articles from specified sourceId", async () => {
    const articlesPerBrand = 5;
    (getRawArticles as jest.Mock).mockResolvedValue([]);

    await createPartnerContent(config, articlesPerBrand, params);

    expect(getRawArticles).toHaveBeenCalledWith(
      config.sourceId,
      articlesPerBrand,
      params
    );
  });

  it("should create partner content block", async () => {
    const articlesPerBrand = 3;
    (getRawArticles as jest.Mock).mockResolvedValue(fakeArticles([1, 2, 3]));

    const partnerContentBlock = await createPartnerContent(
      config,
      articlesPerBrand,
      params
    );

    expect(partnerContentBlock).toEqual({
      type: ContentBlockType.PartnerContent,
      logo: config.logo,
      logoLink: config.logoLink,
      articles: expectedArticles([1, 2, 3]),
      strapName: config.sourceId
    });
  });

  it("should create partner content block with empty articles when failed to retrieve articles", async () => {
    const articlesPerBrand = 3;
    (getRawArticles as jest.Mock).mockRejectedValue(new Error());

    const partnerContentBlock = await createPartnerContent(
      config,
      articlesPerBrand,
      params
    );

    expect(partnerContentBlock).toEqual({
      type: ContentBlockType.PartnerContent,
      logo: config.logo,
      logoLink: config.logoLink,
      articles: [],
      strapName: config.sourceId
    });
  });
});

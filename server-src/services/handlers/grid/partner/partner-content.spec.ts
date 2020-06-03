import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { createPartnerContent } from "./partner-content";
import { IBrandListConfig } from "../../__types__/IBrandConfig";
import { Logo } from "../../../../../common/Logo";
import { Section } from "../../../section";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { homepageArticleContent } from "../../../adapters/article-converter/homepage-article-content.converter";
import { HeadlineFlags } from "../../../../../common/HeadlineFlags";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock(
  "../../../adapters/article-converter/homepage-article-content.converter"
);

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
    const rawArticles = fakeArticles([1, 2, 3, 4, 5]);
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const partnerContentBlock = await createPartnerContent(
      config,
      articlesPerBrand,
      params
    );

    expect(partnerContentBlock).toEqual(
      expect.objectContaining({
        type: ContentBlockType.PartnerContent,
        logo: config.logo,
        logoLink: config.logoLink,
        strapName: config.sourceId
      })
    );
    expect(homepageArticleContent).toHaveBeenCalledTimes(5);
    expect(partnerContentBlock.articles.length).toEqual(5);
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

import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { createPartnerContent } from "./partner-content";
import { IBrandListConfig } from "../../__types__/IBrandConfig";
import { Logo } from "../../../../../common/Logo";
import { Section } from "../../../section";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IPartnerContent } from "../../../../../common/__types__/IPartnerContent";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

jest.mock("../../../adapters/article-retriever/article-retriever");

const fakeArticles = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

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
      articles: [{ id: "1" }, { id: "2" }, { id: "3" }]
    });
  });
});

import { IBrandListConfig } from "../../__types__/IBrandConfig";
import { IParams } from "../../../__types__/IParams";
import { IPartnerContent } from "../../../../../common/__types__/IPartnerContent";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";

export const createPartnerContent = async (
  config: IBrandListConfig,
  articlesPerBrand: number,
  params: IParams
): Promise<IPartnerContent> => {
  const articles = await getRawArticles(
    config.sourceId,
    articlesPerBrand,
    params
  );
  return {
    type: ContentBlockType.PartnerContent,
    logo: config.logo,
    logoLink: config.logoLink,
    articles
  } as IPartnerContent;
};

import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IPartnerContent } from "../../../../../common/__types__/IPartnerContent";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { homepageArticleContent } from "../../../adapters/article-converter/homepage-article-content.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import wrappedLogger from "../../../utils/logger";
import { IBrandListConfig } from "../../__types__/IBrandConfig";

export const createPartnerContent = async (
  config: IBrandListConfig,
  articlesPerBrand: number,
  params: IParams
): Promise<IPartnerContent> => {
  let articles: IRawArticle[] = [];
  try {
    articles = await getRawArticles(config.sourceId, articlesPerBrand, params);
  } catch (error) {
    wrappedLogger.warn(
      params.apiRequestId,
      `Partner Handler - failed to retrieve articles for sourceId: ${config.sourceId} | logo: ${config.logo}`,
      error
    );
  }
  return {
    type: ContentBlockType.PartnerContent,
    logo: config.logo,
    logoLink: config.logoLink,
    articles: articles.map(homepageArticleContent),
    strapName: config.sourceId
  };
};

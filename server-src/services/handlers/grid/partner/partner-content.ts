import { IBrandListConfig } from "../../__types__/IBrandConfig";
import { IParams } from "../../../__types__/IParams";
import { IPartnerContent } from "../../../../../common/__types__/IPartnerContent";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import wrappedLogger from "../../../utils/logger";
import { homepageArticleContent } from "../../../adapters/article-converter/homepage-article-content.converter";

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
      `Brand Handler - failed to retrieve articles for sourceId: ${config.sourceId} | logo: ${config.logo}`,
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

import { IBrandListConfig } from "../../__types__/IBrandConfig";
import { IParams } from "../../../__types__/IParams";
import { IPartnerContent } from "../../../../../common/__types__/IPartnerContent";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IHomepageArticleContent } from "../../../../../common/__types__/IHomepageArticleContent";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import wrappedLogger from "../../../utils/logger";

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
  const homepageArticles: IHomepageArticleContent[] = articles.map(
    (article) => ({
      id: article.id,
      headline: article.indexHeadline,
      title: article.title,
      byline: article.byline,
      introText: article.introText,
      headlineFlags: article.headlineFlags,
      linkUrl: article.linkUrl,
      lastPublishedTime: article.lastPublishedTime,
      identifier: article.identifier,
      image: {
        defcon: article.defconSrc,
        sixteenByNine: article.sixteenByNineSrc
      }
    })
  );
  return {
    type: ContentBlockType.PartnerContent,
    logo: config.logo,
    logoLink: config.logoLink,
    articles: homepageArticles,
    strapName: config.sourceId
  };
};

import { Request, Response } from "express";
import { IBasicAdUnit } from "../../common/__types__/IBasicAdUnit";
import { IBasicArticleTitleUnit } from "../../common/__types__/IBasicArticleTitleUnit";
import { IContentBlock } from "../../common/__types__/IContentBlock";
import { getRecommendedArticles } from "../services/adapters/recommendations/recommendations.service";
import { IRawArticle } from "../services/adapters/__types__/IRawArticle";
import { IBasicArticleUnit } from "../../common/__types__/IBasicArticleUnit";
import { ContentBlockType } from "../../common/__types__/ContentBlockType";

const strapName = "Recommendations";

const basicArticleUnit = (article: IRawArticle): IBasicArticleUnit => ({
  type: ContentBlockType.BasicArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.imageSrc,
  imageSrcSet: article.imageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const basicAdUnit = (): IBasicAdUnit => ({
  type: ContentBlockType.BasicAdUnit,
  context: strapName
});

const basicArticleTitleUnit = (
  article: IRawArticle
): IBasicArticleTitleUnit => ({
  type: ContentBlockType.BasicArticleTitleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

export const getHomePageRecommendations = async (
  req: Request,
  res: Response
) => {
  const {
    segments,
    totalBasicArticlesUnit = 2,
    totalBasicArticleTitleUnit = 3
  } = req.query;
  const articles = await getRecommendedArticles(
    segments,
    parseInt(totalBasicArticlesUnit, 10) +
      parseInt(totalBasicArticleTitleUnit, 10),
    req.spadeParams
  );

  res.json(
    articles.length ? formatArticles(articles, totalBasicArticlesUnit) : []
  );
};

function formatArticles(
  articles: IRawArticle[],
  totalBasicArticlesUnit: number
) {
  const basicArticles = articles
    .slice(0, totalBasicArticlesUnit)
    .map((article) => basicArticleUnit(article));
  const titleArticles = articles
    .slice(totalBasicArticlesUnit)
    .map((article) => basicArticleTitleUnit(article));

  return [...basicArticles, ...titleArticles].reduce(
    (acc, article) => [...acc, article, basicAdUnit()],
    [basicAdUnit()] as IContentBlock[]
  );
}

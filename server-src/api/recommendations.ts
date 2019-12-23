import { Request, Response } from "express";
import { IContentBlock } from "../../common/__types__/IContentBlock";
import { getRecommendedArticles } from "../services/adapters/recommendations/recommendations.service";
import { IRawArticle } from "../services/adapters/__types__/IRawArticle";
import { basicAdUnit } from "../services/adapters/article-converter/basic-ad-unit.converter";
import { basicArticleUnit } from "../services/adapters/article-converter/basic-article-unit.converter";
import { basicArticleTitleUnit } from "../services/adapters/article-converter/basic-article-title.converter";

const strapName = "Recommendations";

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
    .map((article) => basicArticleUnit(article, strapName));
  const titleArticles = articles
    .slice(totalBasicArticlesUnit)
    .map((article) => basicArticleTitleUnit(article, strapName));

  return [...basicArticles, ...titleArticles].reduce(
    (acc, article) => [...acc, article, basicAdUnit(strapName)],
    [basicAdUnit(strapName)] as IContentBlock[]
  );
}

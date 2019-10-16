import { Request, Response } from 'express';
import { IBasicAdUnit } from '../../common/__types__/IBasicAdUnit';
import { IBasicArticleTitleUnit } from '../../common/__types__/IBasicArticleTitleUnit';
import { IContentBlock } from '../../common/__types__/IContentBlock';
import { getRecommendedArticles } from '../services/adapters/recommendations/recommendations.service';
import { IRawArticle } from '../services/adapters/__types__/IRawArticle';
import { IBasicArticleUnit } from '../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../common/__types__/ContentBlockType';

const basicArticleUnit = (
  article: IRawArticle,
  strapName: string
): IBasicArticleUnit => ({
  type: ContentBlockType.BasicArticleUnit,
  id: article.id,
  strapName: strapName,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.imageSrc,
  imageSrcSet: article.imageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const basicAdUnit = (context: string): IBasicAdUnit => ({
  type: ContentBlockType.BasicAdUnit,
  context
});

const basicArticleTitleUnit = (
  article: IRawArticle,
  strapName: string
): IBasicArticleTitleUnit => ({
  type: ContentBlockType.BasicArticleTitleUnit,
  id: article.id,
  strapName: strapName,
  indexHeadline: article.indexHeadline,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

export const getHomePageRecommendations = async (
  req: Request,
  res: Response
) => {
  const {
    segment,
    strapName,
    totalBasicArticlesUnit = 2,
    totalBasicArticleTitleUnit = 3
  } = req.query;
  const articles = await getRecommendedArticles(
    segment,
    totalBasicArticlesUnit + totalBasicArticleTitleUnit,
    req.spadeParams
  );

  res.json(
    articles.length
      ? formatArticles(articles, strapName, totalBasicArticlesUnit)
      : []
  );
};

function formatArticles(
  articles: IRawArticle[],
  strapName: string,
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

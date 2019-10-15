import { Request, Response } from 'express';
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

export const getHomePageRecommendations = async (
  req: Request,
  res: Response
) => {
  const articles = await getRecommendedArticles(
    req.params.segments,
    req.spadeParams
  );

  const articlesAsBasicArticles = articles.map(
    (article) => basicArticleUnit(article, 'Recommendations'));

  res.json(articlesAsBasicArticles);
};

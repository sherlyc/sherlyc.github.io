import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IBasicArticleUnit } from "../../../../../common/__types__/IBasicArticleUnit";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBigImageArticleUnit } from "../../../../../common/__types__/IBigImageArticleUnit";
import { IBasicArticleTitleUnit } from "../../../../../common/__types__/IBasicArticleTitleUnit";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Strap } from "../../../strap";
import { NewsSixPositions } from "./NewsSixPositions";
import wrappedLogger from "../../../utils/logger";

const basicArticleUnit = (
  article: IRawArticle,
  strapName: string
): IBasicArticleUnit => ({
  type: ContentBlockType.BasicArticleUnit,
  id: article.id,
  strapName: strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.imageSrc,
  imageSrcSet: article.imageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const bigImageArticleUnit = (
  article: IRawArticle,
  strapName: string
): IBigImageArticleUnit => ({
  type: ContentBlockType.BigImageArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.strapImageSrc,
  imageSrcSet: article.strapImageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const basicArticleTitleUnit = (
  article: IRawArticle,
  strapName: string
): IBasicArticleTitleUnit => ({
  type: ContentBlockType.BasicArticleTitleUnit,
  id: article.id,
  strapName: strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

export default async function(
  strapName: string,
  sourceId: Strap,
  params: IParams
): Promise<{ [key in string]: IContentBlock }> {
  const articles = await getRawArticles(sourceId, 6, params);
  const articlesLength = articles.length;
  try {
    return {
      [NewsSixPositions.BigTopLeft]: basicArticleUnit(
        articles.shift() as IRawArticle,
        strapName
      ),
      [NewsSixPositions.SmallTopRight]: bigImageArticleUnit(
        articles.shift() as IRawArticle,
        strapName
      ),
      [NewsSixPositions.SmallBottomFirst]: basicArticleTitleUnit(
        articles.shift() as IRawArticle,
        strapName
      ),
      [NewsSixPositions.SmallBottomSecond]: basicArticleTitleUnit(
        articles.shift() as IRawArticle,
        strapName
      ),
      [NewsSixPositions.SmallBottomThird]: basicArticleTitleUnit(
        articles.shift() as IRawArticle,
        strapName
      ),
      [NewsSixPositions.SmallBottomFourth]: basicArticleTitleUnit(
        articles.shift() as IRawArticle,
        strapName
      )
    };
  } catch (e) {
    wrappedLogger.error(
      params.apiRequestId,
      `News Six handler error: Potentially insufficient number of articles: ${articlesLength}. Strap name: ${sourceId}|${strapName}. Error: ${e}`
    );
    throw e;
  }
}

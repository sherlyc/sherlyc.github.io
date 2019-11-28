import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import { Strap } from '../../strap';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { layoutRetriever } from '../../adapters/layout/layout-retriever';
import logger from '../../utils/logger';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IHalfWidthImageArticleUnit } from '../../../../common/__types__/IHalfWidthImageArticleUnit';
import { IGrayDefconArticleUnit } from '../../../../common/__types__/IGrayDefconArticleUnit';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { ITopStoriesArticleListGroupTwoHandlerInput } from '../__types__/ITopStoriesArticleListGroupTwo';

const basicAdUnit = (context: string): IBasicAdUnit => ({
  type: ContentBlockType.BasicAdUnit,
  context
});

const grayDefconArticleUnit = (
  article: IRawArticle,
  strapName: string
): IGrayDefconArticleUnit => ({
  type: ContentBlockType.GrayDefconArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.defconSrc,
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

const halfWidthImageArticleUnit = (
  article: IRawArticle,
  strapName: string
): IHalfWidthImageArticleUnit => ({
  type: ContentBlockType.HalfWidthImageArticleUnit,
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

const retrieveLayout = async (params: IParams): Promise<LayoutType> => {
  try {
    return await layoutRetriever(params);
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `Top Stories Handler - retrieveLayout error - ${error.message}`
    );
    return LayoutType.DEFAULT;
  }
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  { strapName, totalArticles }: ITopStoriesArticleListGroupTwoHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const layout = await retrieveLayout(params);
  let rawArticles = await getRawArticles(
    Strap.TopStories,
    totalArticles,
    params
  );

  if (layout === LayoutType.DEFAULT) {
    rawArticles = [
      rawArticles[1],
      rawArticles[0],
      ...rawArticles.slice(2)
    ].filter(Boolean);
  }

  return rawArticles.reduce(
    (final, article, index) => {
      if (index === 0 && layout === LayoutType.DEFCON) {
        return [
          ...final,
          grayDefconArticleUnit(article, strapName),
          basicAdUnit(strapName)
        ];
      }
      if (index < 3) {
        return [
          ...final,
          bigImageArticleUnit(article, strapName),
          basicAdUnit(strapName)
        ];
      }
      return [
        ...final,
        halfWidthImageArticleUnit(article, strapName),
        basicAdUnit(strapName)
      ];
    },
    [basicAdUnit(strapName)] as IContentBlock[]
  );
}

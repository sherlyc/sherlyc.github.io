import { IRawArticle } from '../../../adapters/__types__/IRawArticle';
import { ContentBlockType } from '../../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import { IBasicAdUnit } from '../../../../../common/__types__/IBasicAdUnit';
import { IBigImageArticleUnit } from '../../../../../common/__types__/IBigImageArticleUnit';
import { getRawArticles } from '../../../adapters/article-retriever/article-retriever';
import { Strap } from '../../../strap';
import { LayoutType } from '../../../adapters/__types__/LayoutType';
import { IParams } from '../../../__types__/IParams';
import { layoutRetriever } from '../../../adapters/layout-retriever';
import logger from '../../../utils/logger';
import { handlerRunnerFunction } from '../../runner';
import { ITopStoriesArticleListHandlerInput } from '../../__types__/ITopStoriesArticleListHandlerInput';
import { IGrayDefconArticleUnit } from '../../../../../common/__types__/IGrayDefconArticleUnit';

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

export const groupOneTopStories = async (
  handlerRunner: handlerRunnerFunction,
  { strapName, totalArticles = 0 }: ITopStoriesArticleListHandlerInput,
  params: IParams
) => {
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
      return [
        ...final,
        bigImageArticleUnit(article, strapName),
        basicAdUnit(strapName)
      ];
    },
    [basicAdUnit(strapName)] as IContentBlock[]
  );
};

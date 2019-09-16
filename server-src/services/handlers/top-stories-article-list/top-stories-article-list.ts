import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IParams } from '../../__types__/IParams';
import { ITopStoriesArticleListHandlerInput } from '../__types__/ITopStoriesArticleListHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { layoutRetriever } from '../../adapters/layout-retriever';
import logger from '../../utils/logger';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { Strap } from '../../strap';

const basicAdUnit = (context: string): IBasicAdUnit => ({
  type: ContentBlockType.BasicAdUnit,
  context
});

const defconArticleUnit = (
  article: IRawArticle,
  strapName: string
): IDefconArticleUnit => ({
  type: ContentBlockType.DefconArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.defconSrc,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const basicArticleUnit = (
  article: IRawArticle,
  strapName: string
): IBasicArticleUnit => ({
  type: ContentBlockType.BasicArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.imageSrc,
  imageSrcSet: article.imageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const mapToArticleBlocks = (articles: IRawArticle[], strapName: string, layoutType: LayoutType) => {
  return articles.reduce(
    (final, article, index) => {
      if (index === 0 && layoutType === LayoutType.DEFCON) {
        return [
          ...final,
          defconArticleUnit(article, strapName),
          basicAdUnit(strapName)
        ];
      }
      return [
        ...final,
        basicArticleUnit(article, strapName),
        basicAdUnit(strapName)
      ];
    },
    [] as IContentBlock[]
  );
};

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
  {
    strapName,
    totalArticles = 0,
  }: ITopStoriesArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const layout = await retrieveLayout(params);
  let rawArticles = await getRawArticles(Strap.TopStories, totalArticles, params);

  if (layout === LayoutType.DEFAULT) {
    rawArticles = [
      rawArticles[1],
      rawArticles[0],
      ...rawArticles.slice(2)
    ].filter(Boolean);
  }

  return mapToArticleBlocks(rawArticles, strapName, layout);
}

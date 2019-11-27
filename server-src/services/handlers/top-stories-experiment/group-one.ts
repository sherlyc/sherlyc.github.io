import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IParams } from '../../__types__/IParams';
import { handlerRunnerFunction } from '../runner';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { layoutRetriever } from '../../adapters/layout-retriever';
import logger from '../../utils/logger';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { Strap } from '../../strap';
import { ITopStoriesArticleListGroupOneHandlerInput } from '../__types__/ITopStoriesArticleListGroupOne';
import { IGrayDefconArticleUnit } from '../../../../common/__types__/IGrayDefconArticleUnit';
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import wrappedLogger from "../../utils/logger";

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
  { strapName, totalArticles }: ITopStoriesArticleListGroupOneHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
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
  } catch (error) {
    wrappedLogger.error(params.apiRequestId, `Group one top stories handler error - ${Strap.TopStories} - ${error}`);
    throw error;
  }
}

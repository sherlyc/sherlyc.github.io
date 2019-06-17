import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { getArticleList, getListAsset } from '../../adapters/jsonfeed';
import { IBasicArticleListHandlerInput } from '../__types__/IBasicArticleListHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { Section } from '../../section';
import { ListAsset } from '../../listAsset';

const createBasicArticleUnitBlock = (
  article: IRawArticle,
  strapName: string
): IBasicArticleUnit => ({
  type: ContentBlockType.BasicArticleUnit,
  id: article.id,
  strapName: strapName,
  author: article.author,
  publisher: article.publisher,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.imageSrc,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const createBasicTitleArticleBlock = (
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

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    totalBasicArticlesUnit = 0,
    totalBasicArticleTitleUnit = 0,
    strapName
  }: IBasicArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit
  };
  const sourceIdIsASection = Object.values(Section).includes(sourceId);
  const totalArticles = totalBasicArticlesUnit + totalBasicArticleTitleUnit;
  const rawArticles = sourceIdIsASection
    ? (await getArticleList(sourceId as Section, totalArticles, params)).slice(
        0,
        totalArticles
      )
    : await getListAsset(params, sourceId as ListAsset, totalArticles);
  return rawArticles.reduce(
    (final, article, index) => {
      if (index < totalBasicArticlesUnit) {
        return [
          ...final,
          createBasicArticleUnitBlock(article, strapName),
          basicAdUnit
        ];
      }
      return [
        ...final,
        createBasicTitleArticleBlock(article, strapName),
        basicAdUnit
      ];
    },
    [basicAdUnit] as IContentBlock[]
  );
}

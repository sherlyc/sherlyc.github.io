import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IBasicAdUnit } from '../../../common/__types__/IBasicAdUnit';
import { getArticleList, getEditorsPick } from '../adapters/jsonfeed';
import { IBasicArticleListHandlerInput } from './__types__/IBasicArticleListHandlerInput';
import { handlerRunnerFunction } from './runner';
import { IParams } from '../__types__/IParams';
import { IBasicArticleTitleUnit } from '../../../common/__types__/IBasicArticleTitleUnit';
import { IRawArticle } from '../adapters/__types__/IRawArticle';
import { Section } from '../section';

const createBasicArticleUnitBlock = (
  article: IRawArticle
): IBasicArticleUnit => ({
  type: ContentBlockType.BasicArticleUnit,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.imageSrc,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const createBasicTitleArticleBlock = (
  article: IRawArticle
): IBasicArticleTitleUnit => ({
  type: ContentBlockType.BasicArticleTitleUnit,
  indexHeadline: article.indexHeadline,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    totalArticles,
    totalBasicArticlesUnit
  }: IBasicArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit
  };
  const sourceIdIsASection = Object.values(Section).includes(sourceId);
  const rawArticles = sourceIdIsASection
    ? (await getArticleList(sourceId as Section, totalArticles, params)).slice(
        0,
        totalArticles
      )
    : await getEditorsPick(params);
  return rawArticles.reduce(
    (final, article, index) => {
      const numberOfBasicArticleUnit = totalBasicArticlesUnit || totalArticles;
      if (index < numberOfBasicArticleUnit) {
        return [...final, createBasicArticleUnitBlock(article), basicAdUnit];
      }
      return [...final, createBasicTitleArticleBlock(article), basicAdUnit];
    },
    [basicAdUnit] as IContentBlock[]
  );
}

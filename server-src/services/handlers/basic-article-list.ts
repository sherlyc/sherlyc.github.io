import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IBasicAdUnit } from '../../../common/__types__/IBasicAdUnit';
import { getArticleList, getEditorsPick } from '../adapters/jsonfeed';
import { IBasicArticleListHandlerInput } from './__types__/IBasicArticleListHandlerInput';
import { handlerRunnerFunction } from './runner';
import { IParams } from '../__types__/IParams';
import { IBasicTitleArticle } from '../../../common/__types__/IBasicTitleArticle';
import { IRawArticle } from '../adapters/__types__/IRawArticle';

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
): IBasicTitleArticle => ({
  type: ContentBlockType.BasicTitleArticle,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sectionId,
    totalArticles,
    totalImageArticles
  }: IBasicArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit
  };

  const rawArticles = sectionId
    ? (await getArticleList(sectionId, totalArticles, params)).slice(
        0,
        totalArticles
      )
    : await getEditorsPick(params);

  return rawArticles.reduce(
    (final, article, index) => [
      ...final,
      index < (totalImageArticles || totalArticles)
        ? createBasicArticleUnitBlock(article)
        : createBasicTitleArticleBlock(article),
      basicAdUnit
    ],
    [basicAdUnit] as IContentBlock[]
  );
}

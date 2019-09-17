import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IBasicArticleListHandlerInput } from '../__types__/IBasicArticleListHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';

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

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    totalBasicArticlesUnit = 0,
    totalBasicArticleTitleUnit = 0,
    strapName,
    layout = LayoutType.DEFAULT,
  }: IBasicArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const totalArticles = totalBasicArticlesUnit + totalBasicArticleTitleUnit;
  const rawArticles = await getRawArticles(sourceId, totalArticles, params);

  return rawArticles.reduce(
    (final, article, index) => {
      if (index < totalBasicArticlesUnit) {
        return [
          ...final,
          basicArticleUnit(article, strapName),
          basicAdUnit(strapName)
        ];
      }
      return [
        ...final,
        basicArticleTitleUnit(article, strapName),
        basicAdUnit(strapName)
      ];
    },
    [basicAdUnit(strapName)] as IContentBlock[]
  );
}

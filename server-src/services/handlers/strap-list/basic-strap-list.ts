import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { Strap } from '../../strap';
import { getStrapArticles } from '../../adapters/strap-list-service';

const createBasicArticleUnitBlock = (
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

const formatAsArticleBlocks = (
  rawArticles: IRawArticle[],
  totalBasicArticleUnits: number,
  strapName: string,
  basicAdUnit: IBasicAdUnit
) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index < totalBasicArticleUnits) {
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
};

const getRawArticles = async (
  sourceId: Strap,
  totalArticles: number,
  layout: LayoutType,
  params: IParams
) => {

  const listAssets = await getStrapArticles(
    params,
    sourceId,
    totalArticles
  );

  return sourceId === Strap.TopStories && layout === LayoutType.DEFAULT
    ? [listAssets[1], listAssets[0], ...listAssets.slice(2)].filter(Boolean)
    : listAssets;
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    totalBasicArticlesUnit = 0,
    totalBasicArticleTitleUnit = 0,
    strapName,
    articleList: {sourceId},
    layout = LayoutType.DEFAULT
  }: any,
  params: IParams
): Promise<IContentBlock[]> {
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit
  };

  console.log(sourceId, {strapName});
  const totalArticles = totalBasicArticlesUnit + totalBasicArticleTitleUnit;
  const rawArticles = await getRawArticles(
    sourceId,
    totalArticles,
    layout,
    params
  );
  return formatAsArticleBlocks(
    rawArticles,
    totalBasicArticlesUnit,
    strapName,
    basicAdUnit
  );
}

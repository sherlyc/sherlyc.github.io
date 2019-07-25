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
  sourceId: Section | ListAsset | Strap,
  totalArticles: number,
  layout: LayoutType,
  params: IParams
) => {
  const sourceIsASection = Object.values(Section).includes(sourceId);

  if (sourceIsASection) {
    return (await getArticleList(
      sourceId as Section,
      totalArticles,
      params
    )).slice(0, totalArticles);
  }
  const sourceIsAStrap = Object.values(Strap).includes(sourceId);
  let list;
  if (sourceIsAStrap) {
    list = await getStrapArticles(
      params,
      sourceId as Strap,
      totalArticles
    );
  } else {
    list = await getListAsset(params, sourceId as ListAsset, totalArticles);
  }

  return (sourceId === Strap.TopStories || sourceId === ListAsset.TopStories) &&
    layout === LayoutType.DEFAULT
    ? [list[1], list[0], ...list.slice(2)].filter(Boolean)
    : list;
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    totalBasicArticlesUnit = 0,
    totalBasicArticleTitleUnit = 0,
    strapName,
    layout = LayoutType.DEFAULT
  }: IBasicArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit
  };
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

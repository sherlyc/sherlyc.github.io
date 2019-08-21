import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { IBasicArticleListHandlerInput } from '../__types__/IBasicArticleListHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { Strap } from '../../strap';
import { getStrapArticles } from '../../adapters/strap-list-service';
import { Section } from '../../section';
import { getSectionArticleList } from '../../adapters/jsonfeed';

const createBasicArticleUnitBlock = (
  article: IRawArticle,
  strapName: string
): IBasicArticleUnit => ({
  type: ContentBlockType.BigImageArticleUnit,
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
  sourceId: Section | Strap,
  totalArticles: number,
  layout: LayoutType,
  params: IParams
) => {
  const sourceIsASection = Object.values(Section).includes(sourceId);
  let rawArticles;

  if (sourceIsASection) {
    return (await getSectionArticleList(
      sourceId as Section,
      totalArticles,
      params
    )).slice(0, totalArticles);
  } else {
    rawArticles = await getStrapArticles(
      params,
      sourceId as Strap,
      totalArticles
    );
  }

  return (sourceId === Strap.TopStories || sourceId === Section.Latest) &&
  layout === LayoutType.DEFAULT
    ? [rawArticles[1], rawArticles[0], ...rawArticles.slice(2)].filter(Boolean)
    : rawArticles;
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

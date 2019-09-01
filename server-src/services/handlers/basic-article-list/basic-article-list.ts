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
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import { IHalfWidthImageArticleUnit } from '../../../../common/__types__/IHalfWidthImageArticleUnit';

const basicAdUnit: IBasicAdUnit = {
  type: ContentBlockType.BasicAdUnit
};

const basicArticleUnit = (
  article: IRawArticle,
  strapName: string,
  type: ContentBlockType.BasicArticleUnit
): IBasicArticleUnit => ({
  type,
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

const bigImageArticleUnit = (
  article: IRawArticle,
  strapName: string,
  type: ContentBlockType.BigImageArticleUnit
): IBigImageArticleUnit => ({
  type,
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

const halfWidthImageArticleUnit = (
  article: IRawArticle,
  strapName: string,
  type: ContentBlockType.HalfWidthImageArticleUnit
): IHalfWidthImageArticleUnit => ({
  type,
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

const controlGroupArticleBlocks = (
  rawArticles: IRawArticle[],
  totalBasicArticleUnits: number,
  strapName: string
) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index < totalBasicArticleUnits) {
        return [
          ...final,
          basicArticleUnit(
            article,
            strapName,
            ContentBlockType.BasicArticleUnit
          ),
          basicAdUnit
        ];
      }
      return [
        ...final,
        basicArticleTitleUnit(article, strapName),
        basicAdUnit
      ];
    },
    [basicAdUnit] as IContentBlock[]
  );
};

const groupOneArticleBlocks = (rawArticles: IRawArticle[], strapName: string) => {
  return rawArticles.reduce(
    (final, article) => {
      return [
        ...final,
        bigImageArticleUnit(
          article,
          strapName,
          ContentBlockType.BigImageArticleUnit
        ),
        basicAdUnit
      ];
    },
    [basicAdUnit] as IContentBlock[]
  );
};

const groupTwoArticleBlocks = (rawArticles: IRawArticle[], strapName: string) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index < 3) {
        return [
          ...final,
          bigImageArticleUnit(
            article,
            strapName,
            ContentBlockType.BigImageArticleUnit
          ),
          basicAdUnit
        ];
      }
      return [
        ...final,
        halfWidthImageArticleUnit(
          article,
          strapName,
          ContentBlockType.HalfWidthImageArticleUnit
        ),
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
    layout = LayoutType.DEFAULT,
    variant = 'control'
  }: IBasicArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const totalArticles = totalBasicArticlesUnit + totalBasicArticleTitleUnit;
  const rawArticles = await getRawArticles(
    sourceId,
    totalArticles,
    layout,
    params
  );

  if (variant === 'groupOne') {
    return groupOneArticleBlocks(rawArticles, strapName);
  } else if (variant === 'groupTwo') {
    return groupTwoArticleBlocks(rawArticles, strapName);
  }
  return controlGroupArticleBlocks(
    rawArticles,
    totalBasicArticlesUnit,
    strapName
  );
}

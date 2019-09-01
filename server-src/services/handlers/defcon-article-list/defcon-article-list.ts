import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IParams } from '../../../services/__types__/IParams';
import { IDefconArticleListHandlerInput } from '../__types__/IDefconArticleListHandlerInput';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IRawArticle } from '../../../services/adapters/__types__/IRawArticle';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';
import { handlerRunnerFunction } from '../runner';
import { Strap } from '../../strap';
import { getStrapArticles } from '../../adapters/strap-list-service';
import { IGrayDefconArticleUnit } from '../../../../common/__types__/IGrayDefconArticleUnit';
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import { IHalfWidthImageArticleUnit } from '../../../../common/__types__/IHalfWidthImageArticleUnit';

const basicAdUnit: IBasicAdUnit = {
  type: ContentBlockType.BasicAdUnit
};

const defconArticleUnit = (
  article: IRawArticle,
  strapName: string,
  type: ContentBlockType.DefconArticleUnit
): IDefconArticleUnit => ({
  type,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.defconSrc,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const grayDefconArticleUnit = (
  article: IRawArticle,
  strapName: string,
  type: ContentBlockType.GrayDefconArticleUnit
): IGrayDefconArticleUnit => ({
  type,
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
  strapName: string,
  type: ContentBlockType.BasicArticleUnit
): IBasicArticleUnit => ({
  type,
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

const controlGroupArticles = (
  rawArticles: IRawArticle[],
  strapName: string
) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index === 0) {
        return [
          ...final,
          defconArticleUnit(
            article,
            strapName,
            ContentBlockType.DefconArticleUnit
          ),
          basicAdUnit
        ];
      }
      return [
        ...final,
        basicArticleUnit(
          article,
          strapName,
          ContentBlockType.BasicArticleUnit
        ),
        basicAdUnit
      ];
    },
    [] as IContentBlock[]
  );
};

const groupOneArticles = (rawArticles: IRawArticle[], strapName: string) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index === 0) {
        return [
          ...final,
          grayDefconArticleUnit(
            article,
            strapName,
            ContentBlockType.GrayDefconArticleUnit
          ),
          basicAdUnit
        ];
      }
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
    [] as IContentBlock[]
  );
};

const groupTwoArticles = (rawArticles: IRawArticle[], strapName: string) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index === 0) {
        return [
          ...final,
          grayDefconArticleUnit(
            article,
            strapName,
            ContentBlockType.GrayDefconArticleUnit
          ),
          basicAdUnit
        ];
      }

      if (index === 1 || index === 2) {
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
    [] as IContentBlock[]
  );
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    totalArticles = 0,
    variant = 'control'
  }: IDefconArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const rawArticles = await getStrapArticles(
    params,
    Strap.TopStories,
    totalArticles
  );

  if (variant === 'groupOne') {
    return groupOneArticles(rawArticles, strapName);
  } else if (variant === 'groupTwo') {
    return groupTwoArticles(rawArticles, strapName);
  }

  return controlGroupArticles(rawArticles, strapName);
}

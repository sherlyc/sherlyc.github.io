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

const basicAdUnit: IBasicAdUnit = {
  type: ContentBlockType.BasicAdUnit
};

const createDefconArticleBlock = (
  article: IRawArticle,
  strapName: string,
  type:
    | ContentBlockType.DefconArticleUnit
    | ContentBlockType.GrayDefconArticleUnit
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

const createBasicArticleBlock = (
  article: IRawArticle,
  strapName: string,
  type:
    | ContentBlockType.BasicArticleUnit
    | ContentBlockType.BigImageArticleUnit
    | ContentBlockType.HalfWidthImageArticleUnit
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

const controlGroupArticles = (rawArticles: IRawArticle[], strapName: string) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index === 0) {
        return [
          ...final,
          createDefconArticleBlock(
            article,
            strapName,
            ContentBlockType.DefconArticleUnit
          ),
          basicAdUnit
        ];
      }
      return [
        ...final,
        createBasicArticleBlock(
          article,
          strapName,
          ContentBlockType.BasicArticleUnit
        ),
        basicAdUnit
      ];
    },
    [] as IContentBlock[]
  );
}

const groupOneArticles = (rawArticles: IRawArticle[], strapName: string) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index === 0) {
        return [
          ...final,
          createDefconArticleBlock(
            article,
            strapName,
            ContentBlockType.GrayDefconArticleUnit
          ),
          basicAdUnit
        ];
      }
      return [
        ...final,
        createBasicArticleBlock(
          article,
          strapName,
          ContentBlockType.BigImageArticleUnit
        ),
        basicAdUnit
      ];
    },
    [] as IContentBlock[]
  );
}

const groupTwoArticles = (rawArticles: IRawArticle[], strapName: string) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index === 0) {
        return [
          ...final,
          createDefconArticleBlock(
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
          createBasicArticleBlock(
            article,
            strapName,
            ContentBlockType.BigImageArticleUnit
          ),
          basicAdUnit
        ];
      }

      return [
        ...final,
        createBasicArticleBlock(
          article,
          strapName,
          ContentBlockType.HalfWidthImageArticleUnit
        ),
        basicAdUnit
      ];
    },
    [] as IContentBlock[]
  );
}

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

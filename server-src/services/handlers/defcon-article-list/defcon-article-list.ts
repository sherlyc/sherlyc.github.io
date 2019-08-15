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

const createDefconArticleBlock = (
  article: IRawArticle,
  strapName: string
): IDefconArticleUnit => ({
  type: ContentBlockType.DefconArticleUnit,
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
  strapName: string
): IBasicArticleUnit => ({
  type: ContentBlockType.BasicArticleUnit,
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

export default async function(
  handlerRunner: handlerRunnerFunction,
  { sourceId, strapName, totalArticles = 0 }: IDefconArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const rawArticles = await getStrapArticles(
    params,
    Strap.TopStories,
    totalArticles
  );

  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit
  };
  const formattedArticles = rawArticles.reduce(
    (final, article, index) => {
      if (index === 0) {
        return [
          ...final,
          createDefconArticleBlock(article, strapName),
          basicAdUnit
        ];
      }
      return [
        ...final,
        createBasicArticleBlock(article, strapName),
        basicAdUnit
      ];
    },
    [] as IContentBlock[]
  );

  return formattedArticles;
}

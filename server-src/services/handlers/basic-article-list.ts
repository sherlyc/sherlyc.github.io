import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IBasicAdUnit } from '../../../common/__types__/IBasicAdUnit';
import { getArticleList } from '../adapters/jsonfeed';
import { IBasicArticleListHandlerInput } from './__types__/IBasicArticleListHandlerInput';
import { handlerRunnerFunction } from './runner';
import { IParams } from '../__types__/IParams';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { sectionId, totalArticles }: IBasicArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit
  };

  const rawArticles = (await getArticleList(
    sectionId,
    totalArticles,
    params
  )).slice(0, totalArticles);

  return rawArticles.reduce(
    (final, article) => [
      ...final,
      {
        type: ContentBlockType.BasicArticleUnit,
        indexHeadline: article.indexHeadline,
        introText: article.introText,
        imageSrc: article.imageSrc,
        linkUrl: article.linkUrl,
        lastPublishedTime: article.lastPublishedTime,
        headlineFlags: article.headlineFlags
      } as IBasicArticleUnit,
      basicAdUnit
    ],
    [basicAdUnit] as IContentBlock[]
  );
}

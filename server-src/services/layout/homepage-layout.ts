import { IRawArticle } from '../__types__/IRawArticle';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../common/__types__/IBasicArticleUnit';
import { IBasicAdUnit } from '../../../common/__types__/IBasicAdUnit';

export default (articleList: IRawArticle[]): IContentBlock[] =>
  articleList.reduce(
    (final, article) => [
      ...final,
      {
        type: 'BasicArticleUnit',
        indexHeadline: article.indexHeadline,
        introText: article.introText,
        imageSrc: article.imageSrc,
        linkUrl: article.linkUrl,
        lastPublishedTime: article.lastPublishedTime,
        headlineFlags: article.headlineFlags
      } as IBasicArticleUnit,
      {
        type: 'BasicAdUnit'
      } as IBasicAdUnit
    ],
    [] as IContentBlock[]
  );

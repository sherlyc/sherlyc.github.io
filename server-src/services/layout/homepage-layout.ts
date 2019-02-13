import { IRawArticle } from '../__types__/IRawArticle';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../common/__types__/IBasicArticleUnit';

export default (articleList: IRawArticle[]): IContentBlock[] => {
  return articleList.map(
    (article) =>
      ({
        type: 'BasicArticleUnit',
        indexHeadline: article.indexHeadline,
        introText: article.introText,
        imageSrc: article.imageSrc,
        linkUrl: article.linkUrl,
        lastPublishedTime: article.lastPublishedTime,
        headlineFlags: article.headlineFlags
      } as IBasicArticleUnit)
  );
};

import { IRawArticle } from '../__types__/IRawArticle';
import { IContentBlock } from '../__types__/IContentBlock';

export default (articleList: IRawArticle[]): IContentBlock[] => {
  return articleList.map((article) => ({
    type: 'BasicArticleUnit',
    indexHeadline: article.indexHeadline,
    introText: article.introText,
    imageSrc: article.imageSrc,
    linkUrl: article.linkUrl,
    lastPublishedTime: article.lastPublishedTime,
    headlineFlags: article.headlineFlags
  }));
};

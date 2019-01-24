import { IRawArticle } from '../../interfaces/IRawArticle';
import { IContentBlock } from '../../interfaces/content-blocks/IContentBlock';

export default (articleList: IRawArticle[]): IContentBlock[] => {
  return articleList.map((article) => ({
    type: 'BasicArticleUnit',
    indexHeadline: article.indexHeadline,
    introText: article.introText,
    imageSrc: article.imageSrc,
    linkUrl: article.linkUrl,
    lastPublishedTime: article.lastPublishedTime,
    // TODO: add article.headlineFlags
    headlineFlag: []
  }));
};

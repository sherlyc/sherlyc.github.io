import { IRawArticle } from '../__types__/IRawArticle';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../common/__types__/IBasicArticleUnit';
import { IBasicAdUnit } from '../../../common/__types__/IBasicAdUnit';
import { IBasicArticleSection } from '../../../common/__types__/IBasicArticleSection';

export default (articleList: IRawArticle[]): IContentBlock[] => [
  {
    type: 'BasicArticleSection',
    linkUrl: '#',
    displayName: 'example',
    displayNameColor: 'blue',
    items: articleList.reduce(
      (final, article) => [
        ...final,
        {
          type: 'BasicAdUnit'
        } as IBasicAdUnit,
        {
          type: 'BasicArticleUnit',
          indexHeadline: article.indexHeadline,
          introText: article.introText,
          imageSrc: article.imageSrc,
          linkUrl: article.linkUrl,
          lastPublishedTime: article.lastPublishedTime,
          headlineFlags: article.headlineFlags
        } as IBasicArticleUnit
      ],
      [] as IContentBlock[]
    )
  } as IBasicArticleSection,
  {
    type: 'BasicAdUnit'
  } as IBasicAdUnit
];

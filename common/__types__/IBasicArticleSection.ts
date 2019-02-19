import { IContentBlock } from './IContentBlock';

export interface IBasicArticleSection {
  type: 'BasicArticleSection';
  displayName: string;
  displayNameColor: string;
  linkUrl: string;
  articleList: IContentBlock[];
}

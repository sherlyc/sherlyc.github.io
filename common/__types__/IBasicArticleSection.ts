import { IContentBlock } from './IContentBlock';
import { ContentBlockType } from './ContentBlockType';

export interface IBasicArticleSection {
  type: ContentBlockType.BasicArticleSection;
  displayName: string;
  displayNameColor: string;
  linkUrl: string;
  items: IContentBlock[];
}

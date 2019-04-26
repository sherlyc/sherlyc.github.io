import { IContentBlock } from './IContentBlock';
import { ContentBlockType } from './ContentBlockType';

export interface IContainer {
  type: ContentBlockType.Container;
  items: IContentBlock[];
}

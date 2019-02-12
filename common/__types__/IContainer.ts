import { IContentBlock } from './IContentBlock';

export interface IContainer {
  type: 'Container';
  items: IContentBlock[];
}

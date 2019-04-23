import { IContentBlock } from './IContentBlock';

export interface IPage {
  apiRequestId: string;
  title: string;
  content: IContentBlock[];
}

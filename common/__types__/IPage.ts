import { IContentBlock } from "./IContentBlock";

export interface IPage {
  apiRequestId: string;
  title: string;
  version: string;
  content: IContentBlock[];
}

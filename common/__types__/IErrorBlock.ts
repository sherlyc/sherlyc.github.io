import { ContentBlockType } from "./ContentBlockType";

export interface IErrorBlock {
  type: ContentBlockType.ErrorBlock;
  message: string;
  debugMessage?: string;
}

import { ContentBlockType } from "./ContentBlockType";

export interface IErrorBlock {
  type: ContentBlockType.ErrorBlock;
  debugMessage?: string;
}

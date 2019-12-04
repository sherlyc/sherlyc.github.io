import { ContentBlockType } from "./ContentBlockType";

export interface IBreakingNews {
  type: ContentBlockType.BreakingNews;
  id: string;
  text: string;
  link: string;
}

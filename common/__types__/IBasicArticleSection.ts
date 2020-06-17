import { ContentBlockType } from "./ContentBlockType";
import { IContentBlock } from "./IContentBlock";

export interface IBasicArticleSection {
  type: ContentBlockType.BasicArticleSection;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  items: IContentBlock[];
}

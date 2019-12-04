import { IContentBlock } from "./IContentBlock";
import { ContentBlockType } from "./ContentBlockType";

export interface IExpandableArticleSection {
  type: ContentBlockType.ExpandableArticleSection;
  displayName: string;
  displayNameColor: string;
  linkUrl: string;
  visibleItems: IContentBlock[];
  hiddenItems: IContentBlock[];
}

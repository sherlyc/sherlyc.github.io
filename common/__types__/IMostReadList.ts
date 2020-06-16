import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";

export interface IMostReadList {
  type: ContentBlockType.MostReadList;
  articles: IHomepageArticleContent[];
  displayName: string;
  strapName: string;
}

import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";

export interface IVerticalArticleList {
  type: ContentBlockType.VerticalArticleList;
  articles: IHomepageArticleContent[];
  displayName: string;
  color: string;
  strapName: string;
}

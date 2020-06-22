import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";

export interface IOpinion {
  type: ContentBlockType.Opinion;
  articles: IHomepageArticleContent[];
  strapName: string;
  displayName: string;
}

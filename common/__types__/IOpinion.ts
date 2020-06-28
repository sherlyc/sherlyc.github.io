import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";

export interface IOpinion {
  type: ContentBlockType.Opinion;
  cartoons: IHomepageArticleContent[];
  articles: IHomepageArticleContent[];
  strapName: string;
  displayName: string;
  url: string;
}

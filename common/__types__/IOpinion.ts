import { AccentColor } from "./AccentColor";
import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";

export interface IOpinion {
  type: ContentBlockType.Opinion;
  articles: IHomepageArticleContent[];
  strapName: string;
  color: AccentColor;
  displayName: string;
}

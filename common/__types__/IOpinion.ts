import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";
import { AccentColor } from "./AccentColor";

export interface IOpinion {
  type: ContentBlockType.Opinion;
  articles: IHomepageArticleContent[];
  strapName: string;
  color: AccentColor;
}

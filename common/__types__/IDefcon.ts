import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";
import { AccentColor } from "./AccentColor";

export interface IDefcon {
  type: ContentBlockType.Defcon;
  articles: IHomepageArticleContent[];
  strapName: string;
  color: AccentColor;
}

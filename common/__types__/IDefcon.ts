import { AccentColor } from "./AccentColor";
import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";

export interface IDefcon {
  type: ContentBlockType.Defcon;
  articles: IHomepageArticleContent[];
  strapName: string;
  color: AccentColor;
}

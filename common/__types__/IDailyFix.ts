import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";

export interface IDailyFix {
  type: ContentBlockType.DailyFix;
  articles: IHomepageArticleContent[];
  strapName: string;
  displayName: string;
}

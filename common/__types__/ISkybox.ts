import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";

export interface ISkybox {
  type: ContentBlockType.Skybox;
  articles: IHomepageArticleContent[];
  strapName: string;
}

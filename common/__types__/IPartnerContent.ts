import { ContentBlockType } from "./ContentBlockType";
import { Logo } from "../Logo";
import { IHomepageArticleContent } from "./IHomepageArticleContent";

export interface IPartnerContent {
  type: ContentBlockType.PartnerContent;
  articles: IHomepageArticleContent[];
  logo: Logo;
  logoLink: string;
  strapName: string;
}

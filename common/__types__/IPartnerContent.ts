import { Logo } from "../Logo";
import { ContentBlockType } from "./ContentBlockType";
import { IHomepageArticleContent } from "./IHomepageArticleContent";

export interface IPartnerContent {
  type: ContentBlockType.PartnerContent;
  articles: IHomepageArticleContent[];
  logo: Logo;
  logoLink: string;
  strapName: string;
}

import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";
import { Logo } from "../Logo";

export interface IPartnerContent {
  type: ContentBlockType.PartnerContent;
  articles: IArticle[];
  logo: Logo;
  logoLink: string;
}

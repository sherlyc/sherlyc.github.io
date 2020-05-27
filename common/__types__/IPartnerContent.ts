import { ContentBlockType } from "./ContentBlockType";
import { Logo } from "../Logo";
import { IRawArticle } from "../../server-src/services/adapters/__types__/IRawArticle";

export interface IPartnerContent {
  type: ContentBlockType.PartnerContent;
  articles: IRawArticle[];
  logo: Logo;
  logoLink: string;
}

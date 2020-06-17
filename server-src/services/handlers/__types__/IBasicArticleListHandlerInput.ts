import { LayoutType } from "../../adapters/__types__/LayoutType";
import { Section } from "../../section";
import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface IBasicArticleListHandlerInput {
  type: HandlerInputType.ArticleList;
  sourceId: Section | Strap;
  strapName: string;
  layout?: LayoutType;
  totalBasicArticlesUnit?: number;
  totalBasicArticleTitleUnit?: number;
}

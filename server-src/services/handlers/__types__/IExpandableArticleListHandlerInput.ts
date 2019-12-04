import { HandlerInputType } from "./HandlerInputType";
import { Section } from "../../section";
import { Strap } from "../../strap";

export interface IExpandableArticleListHandlerInput {
  type: HandlerInputType.ExpandableArticleList;
  sourceId: Section | Strap;
  strapName: string;
  basicArticlesPerPage?: number;
  basicTitleArticlesPerPage?: number;
  pages: number;
}

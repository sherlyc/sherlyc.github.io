import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface IStripsHandlerInput {
  type: HandlerInputType.Strips;
  displayName: string;
  displayNameColor: string;
  strapName: Strap;
  sourceId: Strap;
  articleCount: number;
  articleFormat:
    | ContentBlockType.FeaturedArticle
    | ContentBlockType.BigImageArticleUnit;
}

import { IDedupeDefinition } from "./IDedupeDefinition";

export interface IStrapDefinition {
  ids: string[];
  totalArticlesWithImages?: number;
  totalTitleArticles?: number;
  dedupeRules: {
    dedupeFromBaseList: boolean;
    extraDedupeList?: IDedupeDefinition[];
  };
}

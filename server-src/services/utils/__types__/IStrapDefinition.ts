import { Strap } from '../../strap';

export interface IStrapDefinition {
  ids: string[];
  deduplicateFrom?: Strap[];
  totalArticlesWithImages?: number;
  totalTitleArticles?: number;
}

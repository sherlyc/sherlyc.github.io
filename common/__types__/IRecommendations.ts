import { ContentBlockType } from './ContentBlockType';
import { IContentBlock } from './IContentBlock';

export interface IRecommendations {
  type: ContentBlockType.Recommendations;
  strapName: string;
  totalBasicArticlesUnit: number;
  totalBasicArticleTitleUnit: number;
}

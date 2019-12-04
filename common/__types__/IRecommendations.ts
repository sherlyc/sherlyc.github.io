import { ContentBlockType } from "./ContentBlockType";

export interface IRecommendations {
  type: ContentBlockType.Recommendations;
  displayName: string;
  displayNameColor: string;
  totalBasicArticlesUnit: number;
  totalBasicArticleTitleUnit: number;
}

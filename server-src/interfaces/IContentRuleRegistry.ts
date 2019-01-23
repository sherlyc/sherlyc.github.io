import { IContentRule } from './IContentRule';

export interface IContentRuleRegistry {
  [key: string]: IContentRule;
}

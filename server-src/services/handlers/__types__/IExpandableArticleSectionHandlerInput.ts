import { HandlerInputType } from './HandlerInputType';
import { IExpandableArticleListHandlerInput } from './IExpandableArticleListHandlerInput';

export interface IExpandableArticleSectionHandlerInput {
  type: HandlerInputType.ExpandableArticleSection;
  displayName: string;
  displayNameColor: string;
  linkUrl: string;
  content: IExpandableArticleListHandlerInput;
}

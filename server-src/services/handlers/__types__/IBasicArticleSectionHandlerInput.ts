import { HandlerInputType } from './HandlerInputType';
import { HandlerInput } from './HandlerInput';

export interface IBasicArticleSectionHandlerInput {
  type: HandlerInputType.ArticleSection;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  content: HandlerInput;
}

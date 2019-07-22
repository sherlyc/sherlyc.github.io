import { IBasicArticleListHandlerInput } from './IBasicArticleListHandlerInput';
import { Omit } from 'utility-types';
import { HandlerInputType } from './HandlerInputType';

export interface IStrapListHandlerInput {
  type: HandlerInputType.StrapList;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  articleList: Omit<IBasicArticleListHandlerInput, 'type'>;
}

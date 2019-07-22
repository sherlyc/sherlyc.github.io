import { Omit } from 'utility-types';
import { HandlerInputType } from './HandlerInputType';
import { IStrapListArticleHandlerInput } from './IStrapListArticleHandlerInput';

export interface IStrapListHandlerInput {
  type: HandlerInputType.StrapList;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  articleList: Omit<IStrapListArticleHandlerInput, 'type'>;
}

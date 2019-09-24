import { HandlerInputType } from './HandlerInputType';
import { Section } from '../../section';
import { Strap } from '../../strap';

export interface IMoreSectionExperimentHandlerInput {
  type: HandlerInputType.MoreSectionExperimentHandlerInput;
  linkUrl: string;
  displayName: string;
  displayNameColor: string;
  sourceId: Section | Strap;
  strapName: string;
  totalBasicArticlesUnit?: number;
  totalBasicArticleTitleUnit?: number;
}

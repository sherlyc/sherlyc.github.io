import { Section } from '../../section';
import { HandlerInputType } from './HandlerInputType';

export interface IMidStripHandlerInput {
  type: HandlerInputType.MidStrip;
  sectionId: Section;
  totalArticles: number;
}

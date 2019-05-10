import { Section } from '../../section';
import { HandlerInputType } from './HandlerInputType';

export interface IBasicArticleListHandlerInput {
  type: HandlerInputType.ArticleList;
  sectionId?: Section;
  totalArticles: number;
  totalImageArticles?: number;
}

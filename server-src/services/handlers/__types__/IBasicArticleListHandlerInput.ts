import { Section } from '../../section';

export interface IBasicArticleListHandlerInput {
  type: 'ArticleList';
  sectionId: Section;
  totalArticles: number;
}

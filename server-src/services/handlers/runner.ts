import { IBasicArticleListHandlerInput } from './basic-article-list';
import { IBasicArticleSectionHandlerInput } from './basic-article-section';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import ArticleList from './basic-article-list';
import ArticleSection from './basic-article-section';
import Page from './page';
import { IPageHandlerInput } from './page';

export type HandlerInput =
  | IBasicArticleListHandlerInput
  | IBasicArticleSectionHandlerInput
  | IPageHandlerInput;

type handlerFunction = (input: any) => Promise<IContentBlock[]>;

const handlerRegistry: { [key: string]: handlerFunction } = {
  ArticleList,
  ArticleSection,
  Page
};

export default async function(
  handlerInput: HandlerInput
): Promise<IContentBlock[]> {
  return await handlerRegistry[handlerInput.type](handlerInput);
}

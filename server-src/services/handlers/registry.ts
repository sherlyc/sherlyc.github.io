import { IContentBlock } from '../../../common/__types__/IContentBlock';
import ArticleList from './basic-article-list';
import ArticleSection from './basic-article-section';
import Page from './page';
import { handlerRunnerFunction } from './runner';

type handlerFunction = (
  handlerRunner: handlerRunnerFunction,
  input: any
) => Promise<IContentBlock[]>;

const handlerRegistry: { [key: string]: handlerFunction } = {
  ArticleList,
  ArticleSection,
  Page
};

export default handlerRegistry;

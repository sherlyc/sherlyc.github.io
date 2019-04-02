import { IContentBlock } from '../../../common/__types__/IContentBlock';
import ArticleList from './basic-article-list';
import ArticleSection from './basic-article-section';
import BreakingNews from './breaking-news';
import MidStrip from './midstrip-handler';
import Page from './page';
import { handlerRunnerFunction } from './runner';

type handlerFunction = (
  handlerRunner: handlerRunnerFunction,
  input: any
) => Promise<IContentBlock[]>;

const handlerRegistry: { [key: string]: handlerFunction } = {
  ArticleList,
  MidStrip,
  ArticleSection,
  BreakingNews,
  Page
};

export default handlerRegistry;

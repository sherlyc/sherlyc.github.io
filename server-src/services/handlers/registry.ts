import { IContentBlock } from '../../../common/__types__/IContentBlock';
import ArticleList from './basic-article-list';
import ArticleSection from './basic-article-section';
import BreakingNews from './breaking-news';
import MidStrip from './midstrip-handler';
import ExternalContent from './external-content';
import Page from './page';
import { handlerRunnerFunction } from './runner';
import { IParams } from '../__types__/IParams';
import { HandlerInputType } from './__types__/HandlerInputType';

type handlerFunction = (
  handlerRunner: handlerRunnerFunction,
  input: any,
  params: IParams
) => Promise<IContentBlock[]>;

const handlerRegistry: { [key in HandlerInputType]: handlerFunction } = {
  ArticleList,
  MidStrip,
  ExternalContent,
  ArticleSection,
  BreakingNews,
  Page
};

export default handlerRegistry;

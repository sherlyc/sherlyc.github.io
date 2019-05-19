import { IContentBlock } from '../../../common/__types__/IContentBlock';
import ArticleList from './basic-article-list';
import ArticleSection from './basic-article-section';
import BreakingNews from './breaking-news';
import MidStrip from './midstrip-handler';
import MiniMidStrip from './mini-midstrip-handler';
import ExternalContent from './external-content';
import Weather from './weather';
import Page from './page';
import Video from './video-handler';
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
  MiniMidStrip,
  ExternalContent,
  ArticleSection,
  BreakingNews,
  Page,
  Weather,
  Video
};

export default handlerRegistry;

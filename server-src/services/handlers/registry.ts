import { IContentBlock } from '../../../common/__types__/IContentBlock';
import TopStories from './top-stories/top-stories';
import DefconArticleList from './defcon-article-list/defcon-article-list';
import ArticleList from './basic-article-list/basic-article-list';
import ArticleSection from './basic-article-section/basic-article-section';
import BreakingNews from './breaking-news/breaking-news';
import MidStrip from './midstrip-handler/midstrip-handler';
import MiniMidStrip from './mini-midstrip-handler/mini-midstrip-handler';
import ExternalContent from './external-content/external-content';
import Weather from './weather/weather';
import Page from './page/page';
import Video from './video-handler/video-handler';
import Experiment from './experiment-handler/experiment-handler';
import Feature from './feature-handler/feature-handler';
import { handlerRunnerFunction } from './runner';
import { IParams } from '../__types__/IParams';
import { HandlerInputType } from './__types__/HandlerInputType';

type handlerFunction = (
  handlerRunner: handlerRunnerFunction,
  input: any,
  params: IParams
) => Promise<IContentBlock[]>;

const handlerRegistry: { [key in HandlerInputType]: handlerFunction } = {
  TopStories,
  DefconArticleList,
  ArticleList,
  MidStrip,
  MiniMidStrip,
  ExternalContent,
  ArticleSection,
  BreakingNews,
  Page,
  Weather,
  Video,
  Experiment,
  Feature
};

export default handlerRegistry;

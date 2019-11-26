import { IContentBlock } from '../../../common/__types__/IContentBlock';
import TopStoriesExperiment from './top-stories-experiment/top-stories-experiment';
import TopStoriesArticleList from './top-stories-article-list/top-stories-article-list';
import TopStoriesArticleListGroupOne from './top-stories-experiment/group-one';
import TopStoriesArticleListGroupTwo from './top-stories-experiment/group-two';
import ArticleList from './basic-article-list/basic-article-list';
import ArticleSection from './basic-article-section/basic-article-section';
import MoreSectionExperiment from './more-section-experiment/more-section-experiment';
import ExpandableArticleSection from './more-section-experiment/expandable-article-section';
import ExpandableArticleList from './more-section-experiment/expandable-article-list';
import BreakingNews from './breaking-news/breaking-news';
import Banner from './banner/banner';
import MidStrip from './midstrip-handler/midstrip-handler';
import MiniMidStrip from './mini-midstrip-handler/mini-midstrip-handler';
import ExternalContent from './external-content/external-content';
import Weather from './weather/weather';
import Page from './page/page';
import Experiment from './experiment-handler/experiment-handler';
import Feature from './feature-handler/feature-handler';
import Recommendations from './recommendations/recommendations';
import GridContainer from './grid-container/grid-container';
import { handlerRunnerFunction } from './runner';
import { IParams } from '../__types__/IParams';
import { HandlerInputType } from './__types__/HandlerInputType';

type handlerFunction = (
  handlerRunner: handlerRunnerFunction,
  input: any,
  params: IParams
) => Promise<IContentBlock[]>;

const handlerRegistry: { [key in HandlerInputType]: handlerFunction } = {
  TopStoriesExperiment,
  TopStoriesArticleList,
  TopStoriesArticleListGroupOne,
  TopStoriesArticleListGroupTwo,
  ArticleList,
  MoreSectionExperiment,
  ExpandableArticleSection,
  ExpandableArticleList,
  Banner,
  MidStrip,
  MiniMidStrip,
  ExternalContent,
  ArticleSection,
  BreakingNews,
  Page,
  Weather,
  Experiment,
  Feature,
  Recommendations,
  GridContainer
};

export default handlerRegistry;

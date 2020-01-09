import { IContentBlock } from "../../../common/__types__/IContentBlock";
import TopStoriesArticleList from "./top-stories-article-list/top-stories-article-list";
import ArticleList from "./basic-article-list/basic-article-list";
import ArticleSection from "./basic-article-section/basic-article-section";
import MoreSectionExperiment from "./more-section-experiment/more-section-experiment";
import ExpandableArticleSection from "./more-section-experiment/expandable-article-section";
import ExpandableArticleList from "./more-section-experiment/expandable-article-list";
import BreakingNews from "./breaking-news/breaking-news";
import Banner from "./banner/banner";
import MidStrip from "./midstrip-handler/midstrip-handler";
import MiniMidStrip from "./mini-midstrip-handler/mini-midstrip-handler";
import ExternalContent from "./external-content/external-content";
import Weather from "./weather/weather";
import Page from "./page/page";
import Experiment from "./experiment-handler/experiment-handler";
import Feature from "./feature-handler/feature-handler";
import Recommendations from "./recommendations/recommendations";
import NewsSix from "./grid/news-six/news-six";
import NewsSixGrid from "./grid/news-six-grid/news-six-grid";
import SixImage from "./grid/six-image/six-image";
import SixImageGrid from "./grid/six-image-grid/six-image-grid";
import ListGrid from "./grid/list-grid/list-grid";
import LargeLeadSix from "./grid/large-lead-six/large-lead-six";
import { handlerRunnerFunction } from "./runner";
import { IParams } from "../__types__/IParams";
import { HandlerInputType } from "./__types__/HandlerInputType";

type handlerFunction = (
  handlerRunner: handlerRunnerFunction,
  input: any,
  params: IParams
) => Promise<IContentBlock[]>;

const handlerRegistry: { [key in HandlerInputType]: handlerFunction } = {
  TopStoriesArticleList,
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
  NewsSix,
  NewsSixGrid,
  SixImage,
  SixImageGrid,
  ListGrid,
  LargeLeadSix
};

export default handlerRegistry;

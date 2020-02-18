import { IContentBlock } from "../../../common/__types__/IContentBlock";
import ArticleList from "./basic-article-list/basic-article-list";
import ArticleSection from "./basic-article-section/basic-article-section";
import BreakingNews from "./breaking-news/breaking-news";
import Banner from "./banner/banner";
import ContentBlockHandler from "./content-block/content-block-handler";
import Experiment from "./experiment-handler/experiment-handler";
import ExternalContent from "./external-content/external-content";
import Feature from "./feature-handler/feature-handler";
import ForceUpdate from "./force-update/force-update";
import BiggieSmallsGrid from "./grid/biggie-smalls-grid/biggie-smalls-grid";
import BiggieSmalls from "./grid/biggie-smalls/biggie-smalls";
import ColumnGrid from "./grid/column-grid/column-grid";
import LargeLeadSixGrid from "./grid/large-lead-six-grid/large-lead-six-grid";
import LargeLeadSix from "./grid/large-lead-six/large-lead-six";
import ListGrid from "./grid/list-grid/list-grid";
import NewsSixGrid from "./grid/news-six-grid/news-six-grid";
import NewsSix from "./grid/news-six/news-six";
import RelevantStories from "./grid/relevant-stories/relevant-stories";
import SixImageGrid from "./grid/six-image-grid/six-image-grid";
import SixImage from "./grid/six-image/six-image";
import TopStoriesGrid from "./grid/top-stories-grid/top-stories-grid";
import TopStoriesDefaultOneHighlight from "./grid/top-stories/default-one-highlight/default-one-highlight";
import TopStoriesDefconHighlight from "./grid/top-stories/defcon-highlight/defcon-highlight";
import TopStories from "./grid/top-stories/top-stories";
import MidStrip from "./midstrip-handler/midstrip-handler";
import MiniMidStrip from "./mini-midstrip-handler/mini-midstrip-handler";
import ExpandableArticleList from "./more-section-experiment/expandable-article-list";
import ExpandableArticleSection from "./more-section-experiment/expandable-article-section";
import MoreSectionExperiment from "./more-section-experiment/more-section-experiment";
import Page from "./page/page";
import Recommendations from "./recommendations/recommendations";
import NetworkTopStories from "./grid/network-top-stories/network-top-stories";
import NetworkTopStoriesGrid from "./grid/network-top-stories-grid/network-top-stories-grid";

import { handlerRunnerFunction } from "./runner";
import TopStoriesArticleList from "./top-stories-article-list/top-stories-article-list";
import Weather from "./weather/weather";
import { IParams } from "../__types__/IParams";
import { HandlerInputType } from "./__types__/HandlerInputType";

type handlerFunction = (
  handlerRunner: handlerRunnerFunction,
  input: any,
  params: IParams
) => Promise<IContentBlock[]>;

const handlerRegistry: { [key in HandlerInputType]: handlerFunction } = {
  ContentBlockHandler,
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
  ForceUpdate,
  Page,
  Weather,
  Experiment,
  Feature,
  Recommendations,
  TopStories,
  TopStoriesGrid,
  TopStoriesDefaultOneHighlight,
  TopStoriesDefconHighlight,
  BiggieSmalls,
  BiggieSmallsGrid,
  NewsSix,
  NewsSixGrid,
  SixImage,
  SixImageGrid,
  ListGrid,
  LargeLeadSix,
  LargeLeadSixGrid,
  RelevantStories,
  ColumnGrid,
  NetworkTopStories,
  NetworkTopStoriesGrid
};

export default handlerRegistry;

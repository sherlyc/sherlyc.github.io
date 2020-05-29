import { IContentBlock } from "../../../common/__types__/IContentBlock";
import { IParams } from "../__types__/IParams";
import { HandlerInputType } from "./__types__/HandlerInputType";
import { handlerRunnerFunction } from "./runner";
import Banner from "./banner/banner";
import ArticleList from "./basic-article-list/basic-article-list";
import ArticleSection from "./basic-article-section/basic-article-section";
import BreakingNews from "./breaking-news/breaking-news";
import ContentBlockHandler from "./content-block/content-block-handler";
import Experiment from "./experiment-handler/experiment-handler";
import ExternalContent from "./external-content/external-content";
import Feature from "./feature-handler/feature-handler";
import ForceUpdate from "./force-update/force-update";
import BiggieSmallsGrid from "./grid/biggie-smalls-grid/biggie-smalls-grid";
import BiggieSmalls from "./grid/biggie-smalls/biggie-smalls";
import BrandGrid from "./grid/brand-grid/brand-grid";
import Brand from "./grid/brand/brand";
import ColumnGrid from "./grid/column-grid/column-grid";
import Column from "./grid/column/column";
import HalfFourGrid from "./grid/half-four-grid/half-four-grid";
import HalfFour from "./grid/half-four/half-four";
import LargeLeadSixGrid from "./grid/large-lead-six-grid/large-lead-six-grid";
import LargeLeadSix from "./grid/large-lead-six/large-lead-six";
import LatestHeadlines from "./latest-headlines/latest-headlines";
import ListGrid from "./grid/list-grid/list-grid";
import NewsSixGrid from "./grid/news-six-grid/news-six-grid";
import NewsSixV2Grid from "./grid/news-six-v2-grid/news-six-v2-grid";
import NewsSixV2 from "./grid/news-six-v2/news-six-v2";
import NewsSix from "./grid/news-six/news-six";
import RelevantStoriesGrid from "./grid/relevant-stories-grid/relevant-stories-grid";
import RelevantStories from "./grid/relevant-stories/relevant-stories";
import SixImageGrid from "./grid/six-image-grid/six-image-grid";
import SixImage from "./grid/six-image/six-image";
import StripsGrid from "./grid/strips-grid/strips-grid";
import Strips from "./grid/strips/strips";
import TopStoriesGrid from "./grid/top-stories-grid/top-stories-grid";
import TopStoriesV2Grid from "./grid/top-stories-v2-grid/top-stories-v2-grid";
import TopStoriesV2 from "./grid/top-stories-v2/top-stories-v2";
import TopStoriesDefaultOneHighlight from "./grid/top-stories/default-one-highlight/default-one-highlight";
import TopStoriesDefconHighlight from "./grid/top-stories/defcon-highlight/defcon-highlight";
import TopStories from "./grid/top-stories/top-stories";
import MidStrip from "./midstrip-handler/midstrip-handler";
import MiniMidStrip from "./mini-midstrip-handler/mini-midstrip-handler";
import Page from "./page/page";
import ResponsiveExternalContent from "./responsive-external-content/responsive-external-content";
import TitleSection from "./title-section/title-section";
import TopStoriesArticleList from "./top-stories-article-list/top-stories-article-list";
import Weather from "./weather/weather";
import VersionSwitcher from "./version-switcher/version-switcher";

type handlerFunction = (
  handlerRunner: handlerRunnerFunction,
  input: any,
  params: IParams
) => Promise<IContentBlock[]>;

const handlerRegistry: { [key in HandlerInputType]: handlerFunction } = {
  ContentBlockHandler,
  TopStoriesArticleList,
  ArticleList,
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
  TopStories,
  TopStoriesGrid,
  TopStoriesDefaultOneHighlight,
  TopStoriesDefconHighlight,
  TopStoriesV2,
  TopStoriesV2Grid,
  BiggieSmalls,
  BiggieSmallsGrid,
  NewsSix,
  NewsSixGrid,
  NewsSixV2,
  NewsSixV2Grid,
  SixImage,
  SixImageGrid,
  Strips,
  StripsGrid,
  ListGrid,
  LargeLeadSix,
  LargeLeadSixGrid,
  RelevantStories,
  RelevantStoriesGrid,
  Column,
  ColumnGrid,
  Brand,
  BrandGrid,
  TitleSection,
  ResponsiveExternalContent,
  HalfFour,
  HalfFourGrid,
  VersionSwitcher,
  LatestHeadlines
};

export default handlerRegistry;

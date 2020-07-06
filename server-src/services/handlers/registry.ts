import { IContentBlock } from "../../../common/__types__/IContentBlock";
import { IParams } from "../__types__/IParams";
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
import BiggieSmallsV2Grid from "./grid/biggie-smalls-v2-grid/biggie-smalls-v2-grid";
import BiggieSmallsV2 from "./grid/biggie-smalls-v2/biggie-smalls-v2";
import BiggieSmalls from "./grid/biggie-smalls/biggie-smalls";
import BrandGrid from "./grid/brand-grid/brand-grid";
import Brand from "./grid/brand/brand";
import ColumnGrid from "./grid/column-grid/column-grid";
import Column from "./grid/column/column";
import EditorsPicksGrid from "./grid/editors-picks-grid/editors-picks-grid";
import EditorsPicks from "./grid/editors-picks/editors-picks";
import HalfFourGrid from "./grid/half-four-grid/half-four-grid";
import HalfFour from "./grid/half-four/half-four";
import LargeLeadSixGrid from "./grid/large-lead-six-grid/large-lead-six-grid";
import LargeLeadSixV2Grid from "./grid/large-lead-six-v2-grid/large-lead-six-v2-grid";
import LargeLeadSixV2 from "./grid/large-lead-six-v2/large-lead-six-v2";
import LargeLeadSix from "./grid/large-lead-six/large-lead-six";
import LifeStyle from "./grid/lifestyle/lifestyle";
import ListGrid from "./grid/list-grid/list-grid";
import MostReadGrid from "./grid/most-read-grid/most-read-grid";
import MostRead from "./grid/most-read/most-read";
import NewsSixGrid from "./grid/news-six-grid/news-six-grid";
import NewsSixV2Grid from "./grid/news-six-v2-grid/news-six-v2-grid";
import NewsSixV2 from "./grid/news-six-v2/news-six-v2";
import NewsSix from "./grid/news-six/news-six";
import Partner from "./grid/partner/partner";
import RelevantStoriesGrid from "./grid/relevant-stories-grid/relevant-stories-grid";
import RelevantStories from "./grid/relevant-stories/relevant-stories";
import SixImageGrid from "./grid/six-image-grid/six-image-grid";
import SixImage from "./grid/six-image/six-image";
import StripsGrid from "./grid/strips-grid/strips-grid";
import StripsV2 from "./grid/strips-v2/strips-v2";
import Strips from "./grid/strips/strips";
import TopStoriesGrid from "./grid/top-stories-grid/top-stories-grid";
import TopStoriesV2DefaultGrid from "./grid/top-stories-v2-default-grid/top-stories-v2-default-grid";
import TopStoriesV2DefconGrid from "./grid/top-stories-v2-defcon-grid/top-stories-v2-defcon-grid";
import TopStoriesV2 from "./grid/top-stories-v2/top-stories-v2";
import TopStoriesDefaultOneHighlight from "./grid/top-stories/default-one-highlight/default-one-highlight";
import TopStoriesDefconHighlight from "./grid/top-stories/defcon-highlight/defcon-highlight";
import TopStories from "./grid/top-stories/top-stories";
import LatestHeadlines from "./latest-headlines/latest-headlines";
import MidStrip from "./midstrip-handler/midstrip-handler";
import MiniMidStrip from "./mini-midstrip-handler/mini-midstrip-handler";
import Opinion from "./opinion/opinion";
import Page from "./page/page";
import PlayStuff from "./play-stuff/play-stuff";
import ResponsiveExternalContent from "./responsive-external-content/responsive-external-content";
import { handlerRunnerFunction } from "./runner";
import Skybox from "./skybox/skybox";
import TitleSection from "./title-section/title-section";
import TopStoriesArticleList from "./top-stories-article-list/top-stories-article-list";
import VersionSwitcher from "./version-switcher/version-switcher";
import Weather from "./weather/weather";
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
  TopStoriesV2,
  TopStoriesGrid,
  TopStoriesDefaultOneHighlight,
  TopStoriesDefconHighlight,
  TopStoriesV2DefaultGrid,
  TopStoriesV2DefconGrid,
  BiggieSmalls,
  BiggieSmallsGrid,
  BiggieSmallsV2,
  BiggieSmallsV2Grid,
  NewsSix,
  NewsSixGrid,
  NewsSixV2,
  NewsSixV2Grid,
  SixImage,
  SixImageGrid,
  Strips,
  StripsV2,
  StripsGrid,
  ListGrid,
  LargeLeadSix,
  LargeLeadSixV2,
  LargeLeadSixV2Grid,
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
  LatestHeadlines,
  Partner,
  PlayStuff,
  EditorsPicks,
  EditorsPicksGrid,
  MostReadGrid,
  MostRead,
  Opinion,
  LifeStyle,
  Skybox
};

export default handlerRegistry;

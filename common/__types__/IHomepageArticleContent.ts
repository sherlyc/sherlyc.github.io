import { HeadlineFlags } from "../HeadlineFlags";
import { AccentColor } from "./AccentColor";

export interface IHomepageArticleContent {
  id: string;
  headline: string;
  color: AccentColor.TopStoriesBlue;
  title: string;
  byline?: string;
  introText: string;
  linkUrl: string;
  image: {
    defcon?: string;
    sixteenByNine?: string;
  };
  category: {
    name: string;
    url: string;
  };
  lastPublishedTime: number;
  headlineFlags: HeadlineFlags[];
}

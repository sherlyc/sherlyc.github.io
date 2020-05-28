import { HeadlineFlags } from "../HeadlineFlags";

export interface IHomepageArticleContent {
  id: string;
  headline: string;
  title: string;
  byline?: string;
  introText: string;
  linkUrl: string;
  image: {
    defcon?: string;
    sixteenByNine?: string;
  };
  lastPublishedTime: number;
  headlineFlags: HeadlineFlags[];
  identifier?: string;
}

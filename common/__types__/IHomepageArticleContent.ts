import { HeadlineFlags } from "../HeadlineFlags";

export interface IHomepageArticleContent {
  id: string;
  headline: string;
  title: string;
  byline?: string;
  introText: string;
  linkUrl: string;
  image: {
    defcon: string | null;
    sixteenByNine: string | null;
  };
  lastPublishedTime: number;
  headlineFlags: HeadlineFlags[];
  identifier?: string;
}

import { HeadlineFlags } from "../../../../common/HeadlineFlags";

export interface IRawArticle {
  id: string;
  indexHeadline: string;
  title: string;
  byline?: string;
  introText: string;
  linkUrl: string;
  defconSrc: string | null;
  imageSrc: string | null;
  strapImageSrc: string | null;
  imageSrcSet: string | null;
  strapImageSrcSet: string | null;
  sixteenByNineSrc: string | null;
  lastPublishedTime: number;
  headlineFlags: HeadlineFlags[];
  identifier?: string;
  category: string;
  categoryUrl: string;
}

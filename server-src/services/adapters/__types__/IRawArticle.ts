export interface IRawArticle {
  id: string;
  indexHeadline: string;
  introText: string;
  linkUrl: string;
  defconSrc: string | null;
  imageSrc: string | null;
  imageSrcSet: string | null;
  lastPublishedTime: number;
  headlineFlags: string[];
}

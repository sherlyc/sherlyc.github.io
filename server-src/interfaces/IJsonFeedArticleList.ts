export interface IJsonFeedArticleList {
  stories: Array<{
    id: string;
    path: string;
    alt_headline: string;
    datetime_iso8601: string;
    alt_intro: string;
    images?: Array<{
      variants?: Array<{
        src: string;
      }>;
    }>;
  }>;
}

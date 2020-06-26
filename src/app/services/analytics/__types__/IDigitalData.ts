export interface IDigitalData {
  page: {
    pageInfo: {
      pageID: string;
      pageName: string;
      sysEnv: string | undefined;
      variant: string;
      version: string;
      publisher: string;
      articleID: string;
      headline: string;
      author: string;
      source: string;
      lastPublishedTime: string;
    };
    category: {
      pageType: string;
      primaryCategory: string;
    };
    ads: {
      environment: string;
      exclusions: string;
      sections: string[];
    };
  };
  user: [
    {
      profile: [
        {
          profileInfo: {
            uid: string;
          } | null;
        }
      ];
      segment: {};
    }
  ];
  events: any[];
}

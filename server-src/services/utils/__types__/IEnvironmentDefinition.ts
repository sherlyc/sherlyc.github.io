import { ILoggerOptions } from '../../../../common/__types__/ILoggerOptions';
import { IStrapConfigDefinition } from './IStrapConfigDefinition';

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  jsonFeedAPI: string;
  weatherAPI: string;
  breakingNewsApi: string;
  recommendationsApi: {
    url: string;
    limit: number;
  };
  recommendationsCookie: {
    name: string;
    segments: string[];
    maxCount: number;
  };
  bannerApi: string;
  layoutAPI: string;
  experimentsConfigUrl: string;
  featuresConfigUrl: string;
  maxArticlesToRetrieve: number;
  loggerOptions: ILoggerOptions;
  strapConfig: IStrapConfigDefinition;
}

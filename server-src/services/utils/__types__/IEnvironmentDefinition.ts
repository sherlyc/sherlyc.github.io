import { ILoggerOptions } from "../../../../common/__types__/ILoggerOptions";
import { IStrapConfigDefinition } from "./IStrapConfigDefinition";
import { IFeaturesConfig } from "../../__types__/IFeaturesConfig";

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  jsonFeedAPI: string;
  weatherAPI: string;
  breakingNewsApi: string;
  mostPopularApi: string;
  bannerApi: string;
  layoutAPI: string;
  experimentsConfigUrl: string;
  featuresConfigUrl: string;
  maxArticlesToRetrieve: number;
  loggerOptions: ILoggerOptions;
  strapConfig: IStrapConfigDefinition;
  features: IFeaturesConfig;
}

import { ILoggerOptions } from "../../../../common/__types__/ILoggerOptions";
import { IFeaturesConfig } from "../../__types__/IFeaturesConfig";
import { IStrapConfigDefinition } from "./IStrapConfigDefinition";

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
  adnosticProvider: string;
}

import { ILoggerOptions } from '../../../../common/__types__/ILoggerOptions';

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  jsonFeedAPI: string;
  midStripListAssetId: string;
  miniMidStripListAssetId: string;
  weatherAPI: string;
  contentAPI: string;
  maxArticlesToRetrieve: number;
  loggerOptions: ILoggerOptions;
}

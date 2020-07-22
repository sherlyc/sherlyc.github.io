import { ILoggerOptions } from "../../../../../common/__types__/ILoggerOptions";
import { ILoginLibraryConfig } from "../../authentication/__types__/ILoginLibraryConfig";
import { ScriptId } from "../../script-injector/__types__/ScriptId";

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  swUpdateCheckInterval: number;
  spadeAPI: string;
  weatherAPI: string;
  experimentAPI: string;
  featureAPI: string;
  loggerOptions: ILoggerOptions;
  advertising: { [key in ScriptId]?: string };
  sentryIO: { dsn: string; sampleRate: number; environment: string };
  launchUrl: string;
  loginLibrary: ILoginLibraryConfig;
  redirectUrl: string;
}

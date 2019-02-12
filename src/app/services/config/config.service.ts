import * as config from './config.json';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';
import { makeStateKey, TransferState } from '@angular/platform-browser';

declare const process: {
  env: {
    SPADE_ENV: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  isServer: boolean;
  constructor(
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isServer = isPlatformServer(platformId);
  }

  getEnvironmentName() {
    const STATE_KEY = makeStateKey('SPADE_ENV');
    const stateConfig = this.state.get(STATE_KEY, null);

    if (stateConfig) {
      return stateConfig;
    } else {
      const environmentName = this.isServer
        ? process.env.SPADE_ENV || 'production'
        : 'production';
      this.state.set(STATE_KEY, environmentName);
      return environmentName;
    }
  }

  getConfig(): IEnvironmentDefinition {
    const environments: { [key: string]: IEnvironmentDefinition } = config;
    return (
      environments[this.getEnvironmentName()] || environments['production']
    );
  }
}

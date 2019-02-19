import * as config from './config.json';
import { Injectable } from '@angular/core';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';
import { RuntimeService } from '../runtime/runtime.service';
import { defaults } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private runtime: RuntimeService) {}

  getConfig(): IEnvironmentDefinition {
    const environments: { [key: string]: IEnvironmentDefinition } = config;
    const environmentName = this.runtime.getEnvironmentVariable(
      'SPADE_ENV',
      'production'
    );
    let environment =
      environments[environmentName] || environments['production'];
    if (this.runtime.isServer() && environment.serverOverrides) {
      environment = defaults(environment.serverOverrides, environment);
    }
    if (this.runtime.isBrowser() && environment.browserOverrides) {
      environment = defaults(environment.browserOverrides, environment);
    }
    delete environment.browserOverrides;
    delete environment.serverOverrides;

    return environment;
  }
}

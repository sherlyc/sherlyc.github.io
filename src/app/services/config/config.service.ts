import * as config from './config.json';
import { Injectable } from '@angular/core';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';
import { RuntimeService } from '../runtime/runtime.service';
const defaultsDeep = require('lodash/defaultsDeep');

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
      environment = defaultsDeep(environment.serverOverrides, environment);
    }
    if (this.runtime.isBrowser() && environment.browserOverrides) {
      environment = defaultsDeep(environment.browserOverrides, environment);
    }
    delete environment.browserOverrides;
    delete environment.serverOverrides;

    return environment;
  }
}

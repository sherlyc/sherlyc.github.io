import * as config from './config.json';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';
import { RuntimeService } from '../runtime/runtime.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private runtime: RuntimeService) {}

  getConfig(): IEnvironmentDefinition {
    const environments: { [key: string]: IEnvironmentDefinition } = config;
    return (
      environments[
        this.runtime.getEnvironmentVariable('SPADE_ENV', 'production')
      ] || environments['production']
    );
  }
}

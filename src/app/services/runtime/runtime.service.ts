import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { WindowService } from '../window/window.service';

export type EnvironmentName = 'SPADE_ENV';

declare const process: {
  env: { [key in EnvironmentName]: string };
};

@Injectable({
  providedIn: 'root'
})
export class RuntimeService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    private windowService: WindowService
  ) {}

  domainsByEnvironment: {
    [key: string]: string[];
  } = {
    production: ['i.stuff.co.nz', 'experience.live.shift21.ffx.nz'],
    staging: ['i-preprod.stuff.co.nz', 'experience.staging.shift21.ffx.nz'],
    development: ['localhost', '127.0.0.1']
  };

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  getTransferState<T>(
    stateKeyName: string,
    defaultValue: T,
    factoryInServer: () => T
  ): T {
    const STATE_KEY = makeStateKey(stateKeyName);

    if (this.transferState.hasKey(STATE_KEY)) {
      return this.transferState.get(STATE_KEY, defaultValue);
    } else {
      const value = this.isServer()
        ? factoryInServer() || defaultValue
        : defaultValue;
      this.transferState.set(STATE_KEY, value);
      return value;
    }
  }

  getEnvironmentVariable(name: EnvironmentName, defaultValue: string): string {
    if (this.isServer()) {
      return process.env.SPADE_ENV || defaultValue;
    }
    const hostname = this.windowService.getWindow().location.hostname;
    return this.findEnvironmentByDomain(hostname) || defaultValue;
  }

  private findEnvironmentByDomain(domain: string): string | undefined {
    return Object.keys(this.domainsByEnvironment).find((environment) =>
      this.domainsByEnvironment[environment].includes(domain)
    );
  }
}

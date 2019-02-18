import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';

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
    private transferState: TransferState
  ) {}

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
    return this.getTransferState<string>(
      name,
      defaultValue,
      () => process.env[name]
    );
  }
}

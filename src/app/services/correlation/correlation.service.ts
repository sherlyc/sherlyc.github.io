import { Injectable } from '@angular/core';
import * as uuidv4 from 'uuid/v4';
import * as Fingerprint2 from 'fingerprintjs2';
import { ICorrelation } from './__types__/ICorrelation';
import { StoreService, StorageKeys } from '../store/store.service';
import { RuntimeService } from '../runtime/runtime.service';

@Injectable({
  providedIn: 'root'
})
export class CorrelationService {
  private pageScopedId!: string;
  private apiRequestId!: string;
  private deviceIdPromise!: Promise<string>;

  constructor(
    private storeService: StoreService,
    private runtime: RuntimeService
  ) {}

  generatePageScopedId() {
    this.pageScopedId = uuidv4();
  }

  getPageScopedId(): string {
    return this.pageScopedId;
  }

  setApiRequestId(apiRequestId: string) {
    this.apiRequestId = apiRequestId;
  }

  getApiRequestId() {
    return this.apiRequestId;
  }

  async generateFingerprint() {
    const option: Fingerprint2.Options = {
      // @ts-ignore
      fonts: { extendedJsFonts: true },
      excludes: { userAgent: true }
    };
    const components = await Fingerprint2.getPromise(option);
    const values = components.map((component) => {
      return component.value;
    });
    return Fingerprint2.x64hash128(values.join(''), 31);
  }

  async getDeviceId(): Promise<string> {
    if (this.runtime.isServer()) {
      return 'DeviceId is not supported in server';
    }
    if (this.deviceIdPromise) {
      return this.deviceIdPromise;
    }
    let deviceId = this.storeService.get<string>(StorageKeys.DeviceId);
    if (!deviceId) {
      deviceId = await this.generateFingerprint();
      this.storeService.set<string>(StorageKeys.DeviceId, deviceId);
    }
    this.deviceIdPromise = Promise.resolve(deviceId);
    return this.deviceIdPromise;
  }

  async getCorrelation(): Promise<ICorrelation> {
    return {
      deviceId: await this.getDeviceId(),
      apiRequestId: this.getApiRequestId(),
      pageScopedId: this.getPageScopedId()
    };
  }
}

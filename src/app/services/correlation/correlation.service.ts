import { Injectable } from "@angular/core";
import { v4 } from "uuid";
import { RuntimeService } from "../runtime/runtime.service";
import { StorageKeys, StoreService } from "../store/store.service";
import { ICorrelation } from "./__types__/ICorrelation";

@Injectable({
  providedIn: "root",
})
export class CorrelationService {
  private pageScopedId!: string;
  private apiRequestId!: string;

  constructor(
    private storeService: StoreService,
    private runtime: RuntimeService
  ) {}

  generatePageScopedId() {
    this.pageScopedId = v4();
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

  generateDeviceId() {
    return `${v4()}-${new Date().getTime()}`;
  }

  getDeviceId(): string {
    if (this.runtime.isServer()) {
      return "DeviceId is not supported in server";
    }
    let deviceId = this.storeService.get<string>(StorageKeys.DeviceId);
    if (!deviceId) {
      deviceId = this.generateDeviceId();
      this.storeService.set<string>(StorageKeys.DeviceId, deviceId);
    }
    return deviceId;
  }

  getCorrelation(): ICorrelation {
    return {
      deviceId: this.getDeviceId(),
      apiRequestId: this.getApiRequestId(),
      pageScopedId: this.getPageScopedId(),
    };
  }
}

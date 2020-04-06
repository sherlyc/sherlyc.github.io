import { Injectable } from "@angular/core";
import { IStoreService } from "./__types__/IStoreService";
import { WindowService } from "../window/window.service";

export const storeNamespace = `__storejs_stuff-experience_`;

@Injectable({
  providedIn: "root"
})
export class StoreService implements IStoreService {
  constructor(private windowService: WindowService) {}

  private static getPrefix(key: string) {
    return `${storeNamespace}${key}`;
  }

  get<T>(key: string): T | null {
    const value = this.windowService
      .getLocalStorage()
      .getItem(StoreService.getPrefix(key)) as string;
    try {
      return JSON.parse(value);
    } catch (e) {}
    return (value as any) as T;
  }

  set<T>(key: string, value: T) {
    const keyWithPrefix = StoreService.getPrefix(key);
    if (value === undefined) {
      this.windowService.getLocalStorage().removeItem(keyWithPrefix);
    } else {
      this.windowService
        .getLocalStorage()
        .setItem(keyWithPrefix, JSON.stringify(value));
    }
  }
}

export enum StorageKeys {
  DeviceId = "deviceId",
  WeatherLocation = "weatherLocation",
  BreakingNewsId = "breakingNewsID"
}

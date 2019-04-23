import { Injectable } from '@angular/core';
import { namespace } from 'store';
import { IStoreService } from './__types__/IStoreService';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements IStoreService {
  private store: StoreJsAPI;
  constructor() {
    this.store = namespace('stuff-experience');
  }

  get<T>(key: string): T {
    return this.store.get(key);
  }

  set<T>(key: string, value: T) {
    this.store.set(key, value);
  }
}

export enum StorageKeys {
  DeviceId = 'deviceId'
}

import { IStoreService } from './__types__/IStoreService';

export class ServerStoreService implements IStoreService {
  get<T>(key: string): T & any {
    return 'Store is not supported on server side';
  }

  set<T>(key: string, value: T) {}
}

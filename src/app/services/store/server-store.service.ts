import { IStoreService } from "./__types__/IStoreService";

export class ServerStoreService implements IStoreService {
  get<T>(key: string): T | null {
    return null;
  }

  set<T>(key: string, value: T) {}
}

import { Injectable } from '@angular/core';
import * as cxs from 'cxs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStyleService {
  private prefix = 'spade_';

  constructor() {
    cxs.prefix(this.prefix);
  }

  public stylePrefix(): string {
    return this.prefix;
  }

  public injectStyle(...args: any[]) {
    return cxs(...args);
  }
}

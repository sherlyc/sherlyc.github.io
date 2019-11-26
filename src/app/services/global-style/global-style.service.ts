import { Injectable } from '@angular/core';
import * as cxs from 'cxs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStyleService {
  constructor() {
    cxs.prefix('s_');
  }

  public injectStyle(...args: any[]) {
    return cxs(...args);
  }
}

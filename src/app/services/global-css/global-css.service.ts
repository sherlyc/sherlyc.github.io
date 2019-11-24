import { Injectable } from '@angular/core';
// @ts-ignore
import * as cxs from 'cxs';

@Injectable({
  providedIn: 'root'
})
export class GlobalCssService {
  constructor() {
    cxs.prefix('s_');
  }

  public injectCss(...args: any[]) {
    return cxs(...args);
  }
}

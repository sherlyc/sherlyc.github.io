import { Inject, Injectable, NgZone } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from '../config/config.service';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { ScriptId } from '../script-injector/__types__/ScriptId';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private config: ConfigService,
    private scriptInjectorService: ScriptInjectorService,
    private zone: NgZone
  ) {}

  setup() {
    return this.scriptInjectorService.load(
      ScriptId.adnostic,
      this.config.getConfig().aadSdkUrl
    );
  }

  notify() {
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        if ('name' in Event.prototype.constructor) {
          this.document.dispatchEvent(new Event('NavigationEnd'));
        } else {
          const e = this.document.createEvent('Event');
          e.initEvent('NavigationEnd', true, true);
          this.document.dispatchEvent(e);
        }
      });
    }, 0);
  }
}

import { Inject, Injectable, NgZone } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from '../config/config.service';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { ScriptId } from '../script-injector/__types__/ScriptId';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private config: ConfigService,
    private scriptInjectorService: ScriptInjectorService,
    private http: HttpClient,
    private zone: NgZone
  ) {}

  load?: Promise<void>;

  setup() {
    this.load = new Promise(async (resolve, reject) => {
      try {
        const manifest = await this.http
          .get<{ url: string }>(this.config.getConfig().aadSdkUrl)
          .toPromise();
        await this.scriptInjectorService.load(ScriptId.adnostic, manifest.url);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  async notify() {
    await this.load;
    this.zone.runOutsideAngular(() => {
      if ('name' in Event.prototype.constructor) {
        this.document.dispatchEvent(new Event('NavigationEnd'));
      } else {
        const e = this.document.createEvent('Event');
        e.initEvent('NavigationEnd', true, true);
        this.document.dispatchEvent(e);
      }
    });
  }
}

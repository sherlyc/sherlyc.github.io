import { Inject, Injectable } from '@angular/core';
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
    private scriptInjectorService: ScriptInjectorService
  ) {}

  setup() {
    return this.scriptInjectorService.load(
      ScriptId.adnostic,
      this.config.getConfig().aadSdkUrl
    );
  }

  notify() {
    setTimeout(async () => {
      this.document.dispatchEvent(new Event('NavigationEnd'));
    }, 0);
  }
}

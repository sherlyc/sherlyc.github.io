import { Injectable } from '@angular/core';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { ScriptId } from '../script-injector/__types__/ScriptId';
import { ConfigService } from '../config/config.service';
import { WindowService } from '../window/window.service';
import { RuntimeService } from '../runtime/runtime.service';

@Injectable({
  providedIn: 'root'
})
export class DtmService {
  constructor(
    private scriptInjectorService: ScriptInjectorService,
    private config: ConfigService,
    private runtime: RuntimeService,
    private windowService: WindowService
  ) {}

  nielsenLoaded!: Promise<void>;

  async setup() {
    if (this.runtime.isServer()) {
      return;
    }

    this.nielsenLoaded = new Promise<void>((resolve) => {
      document.addEventListener('nielsen_loaded', () => {
        resolve();
      });
    });

    await this.scriptInjectorService.load(
      ScriptId.dtm,
      this.config.getConfig().dtmUrl
    );

    const satellite = this.windowService.getWindow()._satellite;
    if (satellite && satellite.pageBottom) {
      satellite.pageBottom();
    }
  }
}

import { Inject, Injectable } from "@angular/core";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { ScriptId } from "../script-injector/__types__/ScriptId";
import { ConfigService } from "../config/config.service";
import { WindowService } from "../window/window.service";
import { RuntimeService } from "../runtime/runtime.service";
import { LoadedEvent } from "./__types__/LoadedEvent";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class DtmService {
  constructor(
    private scriptInjectorService: ScriptInjectorService,
    private config: ConfigService,
    private runtime: RuntimeService,
    @Inject(DOCUMENT) private document: Document,
    private windowService: WindowService
  ) {}

  private loadedPromises: { [key: string]: Promise<void> } = {};

  async setup() {
    if (this.runtime.isServer()) {
      return;
    }
    this.initLoadedPromises();
    await this.scriptInjectorService.load(
      ScriptId.launch,
      this.config.getConfig().launchUrl
    );
    const { _satellite: satellite } = this.windowService.getWindow();
    if (satellite && satellite.pageBottom) {
      satellite.pageBottom();
    }
  }

  private initLoadedPromises() {
    Object.values(LoadedEvent).forEach((event) => {
      this.loadedPromises[event] = new Promise<void>((resolve) => {
        this.document.addEventListener(event, () => setTimeout(resolve, 10));
      });
    });
  }

  public getLoadedPromise(loadedEvent: LoadedEvent) {
    return this.loadedPromises[loadedEvent];
  }
}

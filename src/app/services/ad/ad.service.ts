import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, NgZone } from "@angular/core";
import { map } from "lodash-es";
import { ConfigService } from "../config/config.service";
import { LoggerService } from "../logger/logger.service";
import { RuntimeService } from "../runtime/runtime.service";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { ScriptId } from "../script-injector/__types__/ScriptId";

@Injectable({
  providedIn: "root"
})
export class AdService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private config: ConfigService,
    private scriptInjectorService: ScriptInjectorService,
    private runtime: RuntimeService,
    private logger: LoggerService,
    private zone: NgZone
  ) {}

  load?: Promise<any>;

  setup() {
    if (this.runtime.isServer()) {
      return;
    }

    this.load = Promise.all(
      map(this.config.getConfig().advertising, (src: string, id: ScriptId) =>
        this.scriptInjectorService.load(id, src)
      )
    ).catch((e) => {});
  }

  async notify() {
    await this.load;
    this.zone.runOutsideAngular(() => {
      const event = new CustomEvent("NavigationEnd");
      this.document.dispatchEvent(event);
    });
  }
}

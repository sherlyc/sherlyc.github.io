import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, NgZone } from "@angular/core";
import map from "lodash-es/map";
import { ConfigService } from "../config/config.service";
import { FeatureSwitchService } from "../feature-switch/feature-switch.service";
import { LoggerService } from "../logger/logger.service";
import { RuntimeService } from "../runtime/runtime.service";
import { ScriptId } from "../script-injector/__types__/ScriptId";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { IAdServiceEventDetail } from "./AdServiceEventDetail";

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
    private featureSwitch: FeatureSwitchService,
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
    );
  }

  async notify() {
    try {
      await this.load;
      this.zone.runOutsideAngular(() => {
        this.sendCustomEventWithValue({ isHomepageTakeoverOn: true });
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  private sendCustomEventWithValue(detail: IAdServiceEventDetail) {
    const event = new CustomEvent("NavigationEnd", {
      detail
    });
    this.document.dispatchEvent(event);
  }
}

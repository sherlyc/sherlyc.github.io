import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, NgZone } from "@angular/core";
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
    private http: HttpClient,
    private runtime: RuntimeService,
    private logger: LoggerService,
    private featureSwitch: FeatureSwitchService,
    private zone: NgZone
  ) {}

  load?: Promise<void>;

  setup() {
    if (this.runtime.isServer()) {
      return;
    }
    this.load = new Promise(async (resolve, reject) => {
      try {
        const { aadSdkUrl } = this.config.getConfig();
        if (aadSdkUrl) {
          await this.scriptInjectorService.load(ScriptId.adnostic, aadSdkUrl);
        } else {
          this.logger.error(new Error("AdService - no adnostic URL"));
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    });
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

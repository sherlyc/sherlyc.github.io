import { Injectable, OnInit } from "@angular/core";
import { AnalyticsService } from "../analytics/analytics.service";
import { AnalyticsEventsType } from "../analytics/__types__/AnalyticsEventsType";
import { RuntimeService } from "../runtime/runtime.service";
import { WindowService } from "../window/window.service";

@Injectable({
  providedIn: "root"
})
export class PwaService {
  constructor(
    private runtimeService: RuntimeService,
    private windowService: WindowService,
    private analyticsService: AnalyticsService
  ) {}

  setup() {
    if (this.runtimeService.isServer()) {
      return;
    }
    this.windowService.getWindow().addEventListener("appinstalled", () => {
      this.analyticsService.pushEvent({
        type: AnalyticsEventsType.PWA_DOWNLOADED
      });
    });
  }
}

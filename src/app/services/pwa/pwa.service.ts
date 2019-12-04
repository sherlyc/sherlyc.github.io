import { Injectable, OnInit } from "@angular/core";
import { AnalyticsService } from "../analytics/analytics.service";
import { WindowService } from "../window/window.service";
import { RuntimeService } from "../runtime/runtime.service";
import { AnalyticsEventsType } from "../analytics/__types__/AnalyticsEventsType";

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

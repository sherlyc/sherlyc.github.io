import { ApplicationRef, Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { concat, interval } from "rxjs";
import { first } from "rxjs/operators";
import { ConfigService } from "../config/config.service";
import { RuntimeService } from "../runtime/runtime.service";

@Injectable({
  providedIn: "root"
})
export class ServiceWorkerService {
  constructor(
    private applicationRef: ApplicationRef,
    private swUpdate: SwUpdate,
    private runtimeService: RuntimeService,
    private configService: ConfigService
  ) {}

  checkForUpdate() {
    if (this.runtimeService.isBrowser()) {
      const isAppStable = this.applicationRef.isStable.pipe(
        first((isStable) => isStable)
      );
      const updateInterval = interval(
        this.configService.getConfig().swUpdateCheckInterval
      );
      concat(isAppStable, updateInterval).subscribe(() =>
        this.swUpdate.checkForUpdate()
      );
    }
  }
}

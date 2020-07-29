import { ApplicationRef, Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { concat, interval, of } from "rxjs";
import { catchError, first, switchMap } from "rxjs/operators";
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
    if (this.runtimeService.isBrowser() && this.swUpdate.isEnabled) {
      const isAppStable = this.applicationRef.isStable.pipe(
        first((isStable) => isStable)
      );
      const updateInterval = interval(
        this.configService.getConfig().swUpdateCheckInterval
      );
      concat(isAppStable, updateInterval)
        .pipe(
          switchMap(() => this.swUpdate.checkForUpdate()),
          catchError(() => of(null))
        )
        .subscribe();
    }
  }
}

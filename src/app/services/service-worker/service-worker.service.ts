import { ApplicationRef, Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { RuntimeService } from "../runtime/runtime.service";
import { first } from "rxjs/operators";
import { interval, concat } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ServiceWorkerService {
  constructor(
    private applicationRef: ApplicationRef,
    private swUpdate: SwUpdate,
    private runtimeService: RuntimeService
  ) {}

  checkForUpdate() {
    if (this.runtimeService.isBrowser()) {
      const isAppStable = this.applicationRef.isStable.pipe(
        first((isStable) => isStable)
      );
      const everyHour = interval(60 * 60000);
      concat(isAppStable, everyHour).subscribe(() => {
        this.swUpdate.checkForUpdate();
      });
    }
  }
}

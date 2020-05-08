import { Injectable } from "@angular/core";
import { formatISO, isPast, parseISO, set } from "date-fns";
import { AsyncSubject, from, iif, Observable, throwError } from "rxjs";
import { concatMap, timeout, finalize } from "rxjs/operators";
import { IOliSlotConfig } from "../../../../common/__types__/IOli";
import { ITargetingOptions } from "../../content-blocks/oli/__types__/ITargetingOptions";
import { AdService } from "../ad/ad.service";
import { StoreService } from "../store/store.service";
import { WindowService } from "../window/window.service";
import Slot = googletag.Slot;

@Injectable({
  providedIn: "root"
})
export class OliService {
  loadSubject = new AsyncSubject<googletag.events.SlotRenderEndedEvent>();
  slotRegistry = new Map<string, googletag.Slot>();

  constructor(
    private storeService: StoreService,
    private adService: AdService,
    private windowService: WindowService
  ) {}

  load(
    oliSlotConfig: IOliSlotConfig
  ): Observable<googletag.events.SlotRenderEndedEvent> {
    return iif(
      () => this.isMatchingDeviceType() && this.isFirstTimeForToday(),
      from(this.adService.load as Promise<any>).pipe(
        concatMap(() => {
          this.injectAd(oliSlotConfig);
          return this.loadSubject;
        }),
        timeout(5000),
        finalize(this.recordShownState.bind(this))
      ),
      throwError("Current device is not mobile or OLI has been shown today")
    );
  }

  destroy(elementId: string): boolean {
    const slot = this.slotRegistry.get(elementId);
    if (slot) {
      this.slotRegistry.delete(elementId);
      const { googletag } = this.windowService.getWindow();
      return googletag.destroySlots([slot]);
    } else {
      return false;
    }
  }

  private isMatchingDeviceType(): boolean {
    return !this.windowService.isDesktopDomain();
  }

  private isFirstTimeForToday(): boolean {
    const hideUntil = this.storeService.get<string>("oli-hide-until");
    return hideUntil === null || isPast(parseISO(hideUntil));
  }

  private recordShownState(): void {
    const endOfToday = formatISO(
      set(new Date(), { hours: 23, minutes: 59, seconds: 59 })
    );
    this.storeService.set<string>("oli-hide-until", endOfToday);
  }

  private injectAd({
    adUnitPath,
    size,
    elementId,
    targetingParams
  }: IOliSlotConfig) {
    const { googletag } = this.windowService.getWindow();
    googletag.cmd.push(() => {
      const slot = googletag.defineSlot(adUnitPath, size, elementId);
      this.setAdTargetingParameters(slot, targetingParams);
      slot.addService(googletag.pubads());
      slot.addService(googletag.companionAds());
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
      googletag.pubads().refresh([slot]);
      googletag
        .pubads()
        .addEventListener(
          "slotRenderEnded",
          (event: googletag.events.SlotRenderEndedEvent) => {
            if (event.slot !== slot) {
              return;
            }
            if (event.isEmpty) {
              this.loadSubject.error(event);
            } else {
              this.loadSubject.next(event);
            }
            this.loadSubject.complete();
          }
        );
      this.slotRegistry.set(elementId, slot);
    });
  }

  private setAdTargetingParameters(slot: Slot, options: ITargetingOptions) {
    const digitalData = this.windowService.getWindow().digitalData;
    const targeting = {
      env: digitalData.page.ads.environment,
      source: digitalData.page.pageInfo.source,
      ...this.parametersFromQuery(),
      ...options
    } as ITargetingOptions;

    Object.keys(targeting).forEach((key) =>
      slot.setTargeting(key, targeting[key])
    );
  }

  private parametersFromQuery(): ITargetingOptions {
    const targeting: ITargetingOptions = {};
    const targetingParamsWhitelist = ["cpid"];
    const queryString = this.windowService.getWindow().location.search;
    targetingParamsWhitelist.forEach((key) => {
      const regexp = new RegExp(`${key}=([^&]+)`);
      const match = regexp.exec(queryString);
      if (match) {
        targeting[key] = match[1];
      }
    });
    return targeting;
  }
}

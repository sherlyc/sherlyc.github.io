import { Injectable } from "@angular/core";
import { AsyncSubject, from, Observable } from "rxjs";
import { concatMap, timeout } from "rxjs/operators";
import { ITargetingOptions } from "../../content-blocks/oli/__types__/ITargetingOptions";
import { AdService } from "../ad/ad.service";
import { WindowService } from "../window/window.service";
import Slot = googletag.Slot;

@Injectable({
  providedIn: "root"
})
export class OliService {
  loadSubject = new AsyncSubject<googletag.events.SlotRenderEndedEvent>();
  slot?: googletag.Slot;

  constructor(
    private adService: AdService,
    private windowService: WindowService
  ) {}

  load(elementId: string): Observable<googletag.events.SlotRenderEndedEvent> {
    return from(this.adService.load as Promise<any>).pipe(
      concatMap(() => {
        this.injectAd(elementId);
        return this.loadSubject;
      }),
      timeout(5000)
    );
  }

  injectAd(elementId: string) {
    const { googletag } = this.windowService.getWindow();
    const cmd = googletag.cmd || [];
    cmd.push(() => {
      this.slot = googletag.defineSlot(
        "/6674/mob.stuff.homepage",
        [320, 460],
        elementId
      );
      this.setAdTargetingParameters(this.slot, {
        spade: "true",
        pos: "interstitial-portrait"
      });
      this.slot.addService(googletag.pubads());
      this.slot.addService(googletag.companionAds());
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
      googletag.pubads().refresh([this.slot]);
      googletag
        .pubads()
        .addEventListener(
          "slotRenderEnded",
          (event: googletag.events.SlotRenderEndedEvent) => {
            if (event.isEmpty) {
              this.loadSubject.error(event);
            } else {
              this.loadSubject.next(event);
            }
            this.loadSubject.complete();
          }
        );
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

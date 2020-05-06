import { Component, Input, OnInit } from "@angular/core";
import { formatISO, isPast, parseISO, set } from "date-fns";
import { AsyncSubject, from } from "rxjs";
import { concatMap, timeout } from "rxjs/operators";
import { IOli } from "../../../../common/__types__/IOli";
import { AdService } from "../../services/ad/ad.service";
import { StoreService } from "../../services/store/store.service";
import { WindowService } from "../../services/window/window.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { ITargetingOptions } from "./__types__/ITargetingOptions";
import Slot = googletag.Slot;

@Component({
  selector: "app-oli",
  templateUrl: "./oli.component.html",
  styleUrls: ["./oli.component.scss"]
})
export class OliComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IOli;
  show = true;
  loading = true;
  loadSubject = new AsyncSubject<googletag.events.SlotRenderEndedEvent>();

  constructor(
    private storeService: StoreService,
    private windowService: WindowService,
    private adService: AdService
  ) {}

  async ngOnInit() {
    if (this.isFirstTimeForToday()) {
      from(this.adService.load as Promise<any>)
        .pipe(
          concatMap(() => {
            this.injectAd();
            return this.loadSubject;
          }),
          timeout(5000)
        )
        .subscribe({
          next: () => {
            this.loading = false;
            this.recordShownState();
          },
          error: () => {
            this.show = false;
            this.recordShownState();
          }
        });
    } else {
      this.show = false;
    }
  }

  injectAd() {
    const { googletag } = this.windowService.getWindow();
    const cmd = googletag.cmd || [];
    cmd.push(() => {
      const slot = googletag.defineSlot(
        "/6674/mob.stuff.homepage",
        [320, 460],
        "oliAdId"
      );

      this.setAdTargetingParameters(slot, {
        spade: "true",
        pos: "interstitial-portrait"
      });
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
    targetingParamsWhitelist.forEach((key) => {
      const regexp = new RegExp(`${key}=([^&])`);
      const match = regexp.exec(window.location.search);
      if (match) {
        targeting[key] = match[1];
      }
    });
    return targeting;
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
}

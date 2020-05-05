import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IOli } from "../../../../common/__types__/IOli";
import { StoreService } from "../../services/store/store.service";
import { isPast, parseISO } from "date-fns";
import { WindowService } from "../../services/window/window.service";
import { AdService } from "../../services/ad/ad.service";
import Slot = googletag.Slot;
import { ITargetingOptions } from "./__types__/ITargetingOptions";
import { Subject } from "rxjs";

@Component({
  selector: "app-oli",
  templateUrl: "./oli.component.html",
  styleUrls: ["./oli.component.scss"]
})
export class OliComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IOli;
  show = true;
  loading = true;
  loadSubject = new Subject<googletag.events.SlotRenderEndedEvent>();

  constructor(
    private storeService: StoreService,
    private windowService: WindowService,
    private adService: AdService
  ) {}

  async ngOnInit() {
    this.loadSubject.subscribe({
      next: () => (this.loading = false),
      error: () => (this.show = false)
    });

    const hideUntil = this.storeService.get<string>("oli-hide-until");
    const showOli = hideUntil === null || isPast(parseISO(hideUntil));
    if (showOli) {
      await this.injectAd();
    } else {
      this.show = false;
    }
  }

  async injectAd() {
    await this.adService.load;
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
          }
        );
    });
  }

  setAdTargetingParameters(slot: Slot, options: ITargetingOptions) {
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
}

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OliComponent } from "./oli.component";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { StoreService } from "../../services/store/store.service";
import { By } from "@angular/platform-browser";
import { formatISO, set, sub } from "date-fns";
import { AdService } from "../../services/ad/ad.service";
import { WindowService } from "../../services/window/window.service";
import SlotRenderEndedEvent = googletag.events.SlotRenderEndedEvent;
import Slot = googletag.Slot;

class MockAdService {
  load?: Promise<any> = Promise.resolve();
}

describe("OliComponent", () => {
  let component: OliComponent;
  let fixture: ComponentFixture<OliComponent>;
  let storeService: ServiceMock<StoreService>;
  let adService: ServiceMock<AdService>;
  let windowService: ServiceMock<WindowService>;
  const slot = ({
    addService: jest.fn(),
    setTargeting: jest.fn()
  } as any) as Slot;
  let slotRenderEndedEvent: SlotRenderEndedEvent;
  let gptCallTimeout: NodeJS.Timeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OliComponent],
      providers: [
        { provide: StoreService, useClass: mockService(StoreService) },
        { provide: AdService, useClass: MockAdService },
        { provide: WindowService, useClass: mockService(WindowService) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    storeService = TestBed.inject(StoreService) as ServiceMock<StoreService>;
    adService = TestBed.inject(AdService) as ServiceMock<AdService>;
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
    fixture = TestBed.createComponent(OliComponent);
    component = fixture.componentInstance;
    slotRenderEndedEvent = {
      size: [300, 250],
      slot,
      isEmpty: false
    } as SlotRenderEndedEvent;

    windowService.getWindow.mockReturnValue({
      googletag: {
        cmd: { push: jest.fn().mockImplementation((func) => func()) },
        defineSlot: jest.fn().mockReturnValue(slot),
        pubads: jest.fn().mockReturnValue({
          enableSingleRequest: jest.fn(),
          refresh: jest.fn(),
          addEventListener: jest
            .fn()
            .mockImplementation(
              (eventType: string, handler: Function) =>
                (gptCallTimeout = setTimeout(
                  () => handler(slotRenderEndedEvent),
                  1000
                ))
            )
        }),
        companionAds: jest.fn(),
        enableServices: jest.fn()
      },
      digitalData: {
        page: { ads: { environment: "prod" }, pageInfo: { source: "" } }
      }
    });
  });

  describe("frequency cap", () => {
    it("should show overlay when oli has never been shown", () => {
      storeService.get.mockReturnValue(null);

      fixture.detectChanges();

      const oliOverlay = fixture.debugElement.query(By.css(".oliOverlay"));
      expect(oliOverlay).toBeTruthy();
    });

    it("should show overlay when oli has been shown yesterday", () => {
      const endOfYesterday = formatISO(
        set(sub(new Date(), { days: 1 }), {
          hours: 23,
          minutes: 59,
          seconds: 59
        })
      );
      storeService.get.mockReturnValue(endOfYesterday);

      fixture.detectChanges();

      const oliOverlay = fixture.debugElement.query(By.css(".oliOverlay"));
      expect(oliOverlay).toBeTruthy();
    });

    it("should not show overlay when oli has been shown today", () => {
      const endOfToday = formatISO(
        set(new Date(), { hours: 23, minutes: 59, seconds: 59 })
      );
      storeService.get.mockReturnValue(endOfToday);

      fixture.detectChanges();

      const oliOverlay = fixture.debugElement.query(By.css(".oliOverlay"));
      expect(oliOverlay).toBeFalsy();
    });
  });

  it("should inject ad", async () => {
    const { googletag } = windowService.getWindow();
    storeService.get.mockReturnValue(null);

    await component.renderOli();

    expect(googletag.cmd.push).toHaveBeenCalledTimes(1);
    expect(googletag.defineSlot).toHaveBeenCalledWith(
      "/6674/mob.stuff.homepage",
      [320, 460],
      "oliAdId"
    );
    expect(slot.setTargeting).toHaveBeenCalledWith("spade", "true");
    expect(slot.setTargeting).toHaveBeenCalledWith(
      "pos",
      "interstitial-portrait"
    );
    expect(slot.setTargeting).toHaveBeenCalledWith("env", "prod");
    expect(slot.setTargeting).toHaveBeenCalledWith("source", "");
    expect(slot.addService).toHaveBeenCalledWith(googletag.pubads());
    expect(slot.addService).toHaveBeenCalledWith(googletag.companionAds());
    expect(googletag.pubads().enableSingleRequest).toHaveBeenCalledTimes(1);
    expect(googletag.enableServices).toHaveBeenCalledTimes(1);
    expect(googletag.pubads().refresh).toHaveBeenCalledWith([slot]);
    expect(googletag.pubads().addEventListener).toHaveBeenCalledWith(
      "slotRenderEnded",
      expect.any(Function)
    );
  });

  it("should display ads when ad is returned", (done) => {
    slotRenderEndedEvent.isEmpty = false;
    storeService.get.mockReturnValue(null);

    fixture.detectChanges();

    component.loadSubject.subscribe(() => {
      done();
    });
  });

  it("should not display ads when ad is not returned", (done) => {
    slotRenderEndedEvent.isEmpty = true;
    storeService.get.mockReturnValue(null);

    fixture.detectChanges();

    component.loadSubject.subscribe({
      error: () => {
        done();
      }
    });
  });
});

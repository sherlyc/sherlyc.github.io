import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { formatISO, set, sub } from "date-fns";
import { AdService } from "../../services/ad/ad.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { StoreService } from "../../services/store/store.service";
import { WindowService } from "../../services/window/window.service";
import { OliComponent } from "./oli.component";
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

  describe("Frequency Cap", () => {
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

    it("should record oli shown state", async () => {
      const endOfToday = formatISO(
        set(new Date(), { hours: 23, minutes: 59, seconds: 59 })
      );
      storeService.get.mockReturnValue(null);

      fixture.detectChanges();
      await fixture.whenStable();

      expect(storeService.set).toHaveBeenCalledWith(
        "oli-hide-until",
        endOfToday
      );
    });
  });

  describe("GPT", () => {
    beforeEach(() => {
      storeService.get.mockReturnValue(null);
    });

    it("should call GPT properly", async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const { googletag } = windowService.getWindow();
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

    it("should display ad when ad is returned from GPT", async () => {
      slotRenderEndedEvent.isEmpty = false;

      expect(component.show).toBe(true);
      expect(component.loading).toBe(true);

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.show).toBe(true);
      expect(component.loading).toBe(false);
    });

    it("should remove overlay when ad is not returned from GPT", async () => {
      slotRenderEndedEvent.isEmpty = true;

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.show).toBe(false);
    });
  });

  describe("Error Handling", () => {
    beforeEach(() => {
      storeService.get.mockReturnValue(null);
    });

    it("should remove overlay when ad is not loaded within the time limit", async () => {
      clearTimeout(gptCallTimeout); // slotRenderEndedEvent never fires

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.show).toBe(false);
    });
  });
});

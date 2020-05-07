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
import { OliService } from "../../services/oli/oli.service";

class MockAdService {
  load?: Promise<any> = Promise.resolve();
}

describe("OliComponent", () => {
  let component: OliComponent;
  let fixture: ComponentFixture<OliComponent>;
  let storeService: ServiceMock<StoreService>;
  let adService: ServiceMock<AdService>;
  let windowService: ServiceMock<WindowService>;
  let oliService: ServiceMock<OliService>;
  const slot = ({
    addService: jest.fn(),
    setTargeting: jest.fn()
  } as any) as Slot;
  let addEventListener: jest.Mock;
  let slotRenderEndedEvent: SlotRenderEndedEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OliComponent],
      providers: [
        { provide: StoreService, useClass: mockService(StoreService) },
        { provide: AdService, useClass: MockAdService },
        { provide: WindowService, useClass: mockService(WindowService) },
        { provide: OliService, useClass: mockService(OliService) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    storeService = TestBed.inject(StoreService) as ServiceMock<StoreService>;
    adService = TestBed.inject(AdService) as ServiceMock<AdService>;
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
    oliService = TestBed.inject(OliService) as ServiceMock<OliService>;
    fixture = TestBed.createComponent(OliComponent);
    component = fixture.componentInstance;
    addEventListener = jest
      .fn()
      .mockImplementation((eventType: string, handler: Function) =>
        handler(slotRenderEndedEvent)
      );
    slotRenderEndedEvent = {
      size: [300, 250],
      slot,
      isEmpty: false
    } as SlotRenderEndedEvent;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  xdescribe("Frequency Cap", () => {
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

  xdescribe("Calling oli service", () => {
    beforeEach(() => {
      storeService.get.mockReturnValue(null);
    });

    it("should display ad when ad is returned from oli service", async () => {
      slotRenderEndedEvent.isEmpty = false;

      expect(component.show).toBe(true);
      expect(component.loading).toBe(true);

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.show).toBe(true);
      expect(component.loading).toBe(false);
    });

    it("should remove overlay when ad is not returned from oli service", async () => {
      slotRenderEndedEvent.isEmpty = true;

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.show).toBe(false);
    });
  });

  xdescribe("Error Handling", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      storeService.get.mockReturnValue(null);
    });

    it("should remove overlay when ad is not loaded within the time limit", async () => {
      fixture.detectChanges();
      jest.advanceTimersByTime(5000); // fast-forward time to trigger fail-safe
      await fixture.whenStable();

      expect(component.show).toBe(false);
    });
  });
});

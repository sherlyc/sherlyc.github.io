import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { formatISO, set, sub } from "date-fns";
import { of, throwError } from "rxjs";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { OliService } from "../../services/oli/oli.service";
import { StoreService } from "../../services/store/store.service";
import { OliComponent } from "./oli.component";

describe("OliComponent", () => {
  let component: OliComponent;
  let fixture: ComponentFixture<OliComponent>;
  let storeService: ServiceMock<StoreService>;
  let oliService: ServiceMock<OliService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OliComponent],
      providers: [
        { provide: StoreService, useClass: mockService(StoreService) },
        { provide: OliService, useClass: mockService(OliService) }
      ]
    }).compileComponents();

    storeService = TestBed.inject(StoreService) as ServiceMock<StoreService>;
    oliService = TestBed.inject(OliService) as ServiceMock<OliService>;
    fixture = TestBed.createComponent(OliComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set id attribute on the ad slot", () => {
    storeService.get.mockReturnValue(null);
    oliService.load.mockReturnValue(
      of({} as googletag.events.SlotRenderEndedEvent)
    );
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css(`[id="${component.oliAdId}"`))
    ).toBeTruthy();
  });

  describe("Frequency Cap", () => {
    beforeEach(() => {
      oliService.load.mockReturnValue(
        of({} as googletag.events.SlotRenderEndedEvent)
      );
    });

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

  describe("Calling oli service", () => {
    beforeEach(() => {
      storeService.get.mockReturnValue(null);
    });

    it("should display ad when ad is returned from oli service", async () => {
      oliService.load.mockReturnValue(
        of({} as googletag.events.SlotRenderEndedEvent)
      );

      expect(component.show).toBe(true);
      expect(component.loading).toBe(true);

      fixture.detectChanges();
      await fixture.whenStable();

      expect(oliService.load).toHaveBeenCalledWith(component.oliAdId);
      expect(component.show).toBe(true);
      expect(component.loading).toBe(false);
    });

    it("should remove overlay when ad is not returned from oli service", async () => {
      oliService.load.mockReturnValue(
        throwError({} as googletag.events.SlotRenderEndedEvent)
      );

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.show).toBe(false);
    });

    it("should close when the close button has been clicked", async () => {
      oliService.load.mockReturnValue(
        of({} as googletag.events.SlotRenderEndedEvent)
      );
      oliService.destroy.mockReturnValue(true);

      fixture.detectChanges();
      await fixture.whenStable();

      fixture.debugElement
        .query(By.css(".oliHeaderClose"))
        .nativeElement.click();

      expect(oliService.destroy).toHaveBeenCalledWith(
        expect.stringMatching(/^spade-oli-slot-/)
      );
      expect(component.show).toBe(false);
    });
  });
});

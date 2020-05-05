import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OliComponent } from "./oli.component";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { StoreService } from "../../services/store/store.service";
import { By } from "@angular/platform-browser";
import { formatISO, set, sub } from "date-fns";

describe("OliComponent", () => {
  let component: OliComponent;
  let fixture: ComponentFixture<OliComponent>;
  let storeService: ServiceMock<StoreService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OliComponent],
      providers: [
        { provide: StoreService, useClass: mockService(StoreService) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    storeService = TestBed.inject(StoreService) as ServiceMock<StoreService>;
    fixture = TestBed.createComponent(OliComponent);
    component = fixture.componentInstance;
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
});

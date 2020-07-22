import { ChangeDetectorRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of, Subscription, throwError } from "rxjs";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { OliService } from "../../services/oli/oli.service";
import { RuntimeService } from "../../services/runtime/runtime.service";
import { OliComponent } from "./oli.component";

const oliSlotConfig = {
  adUnitPath: "/6674/mob.stuff.homepage",
  size: [320, 460],
  targetingParams: {
    spade: "true",
    pos: "interstitial-portrait"
  }
};

describe("OliComponent", () => {
  let component: OliComponent;
  let fixture: ComponentFixture<OliComponent>;
  let runtimeService: ServiceMock<RuntimeService>;
  let oliService: ServiceMock<OliService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OliComponent],
      providers: [
        { provide: OliService, useClass: mockService(OliService) },
        { provide: RuntimeService, useClass: mockService(RuntimeService) }
      ]
    }).compileComponents();

    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    oliService = TestBed.inject(OliService) as ServiceMock<OliService>;
    fixture = TestBed.createComponent(OliComponent);
    component = fixture.componentInstance;
    component.input = {
      type: ContentBlockType.Oli,
      config: oliSlotConfig
    };

    runtimeService.isServer.mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set id attribute on the ad slot", () => {
    oliService.load.mockReturnValue(
      of({} as googletag.events.SlotRenderEndedEvent)
    );
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css(`[id="${component.oliAdId}"`))
    ).toBeTruthy();
  });

  it("should not display or do anything when in server", () => {
    runtimeService.isServer.mockReturnValue(true);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css(".oliOverlay"))).toBeFalsy();
    expect(oliService.load).not.toHaveBeenCalled();
  });

  it("should unsubscribe when oli is destroyed", () => {
    oliService.load.mockReturnValue(
      of({} as googletag.events.SlotRenderEndedEvent)
    );
    fixture.detectChanges();
    jest.spyOn(component.subscription as Subscription, "unsubscribe");

    component.ngOnDestroy();

    expect(component.subscription?.unsubscribe).toHaveBeenCalledTimes(1);
  });

  describe("Calling OLI service", () => {
    let detectChanges: any;
    beforeEach(() => {
      detectChanges = jest.spyOn(
        (component as any).changeDetectorRef,
        "detectChanges"
      );
    });

    it("should display ad when ad is returned from oli service", async () => {
      oliService.load.mockReturnValue(
        of({} as googletag.events.SlotRenderEndedEvent)
      );

      expect(component.show).toBe(true);
      expect(component.loading).toBe(true);

      fixture.detectChanges();
      await fixture.whenStable();

      expect(oliService.load).toHaveBeenCalledWith({
        ...oliSlotConfig,
        elementId: component.oliAdId
      });
      expect(component.show).toBe(true);
      expect(component.loading).toBe(false);
      expect(detectChanges).toHaveBeenCalledTimes(1);
    });

    it("should remove overlay when ad is not returned from oli service", async () => {
      oliService.load.mockReturnValue(
        throwError({} as googletag.events.SlotRenderEndedEvent)
      );

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.show).toBe(false);
      expect(detectChanges).toHaveBeenCalledTimes(1);
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
      expect(detectChanges).toHaveBeenCalledTimes(2);
    });
  });
});

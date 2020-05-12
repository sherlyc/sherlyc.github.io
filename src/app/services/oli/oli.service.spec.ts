import { TestBed } from "@angular/core/testing";
import { formatISO, set, sub } from "date-fns";
import { TimeoutError } from "rxjs";
import { DeviceType } from "../../../../common/DeviceType";
import { AdService } from "../ad/ad.service";
import { DeviceService } from "../device/device.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { StoreService } from "../store/store.service";
import { WindowService } from "../window/window.service";
import { OliService } from "./oli.service";

class MockAdService {
  load?: Promise<any> = Promise.resolve();
}

const elementId = "fake-id";
const oliSlotConfig = {
  adUnitPath: "/6674/mob.stuff.homepage",
  size: [320, 460],
  targetingParams: {
    spade: "true",
    pos: "interstitial-portrait"
  },
  elementId
};

describe("Oli service", () => {
  let oliService: OliService;
  let deviceService: ServiceMock<DeviceService>;
  let storeService: ServiceMock<StoreService>;
  let adService: ServiceMock<AdService>;
  let windowService: ServiceMock<WindowService>;

  const slot = ({
    addService: jest.fn(),
    setTargeting: jest.fn()
  } as any) as googletag.Slot;
  let addEventListener: jest.Mock;
  let slotRenderEndedEvent: googletag.events.SlotRenderEndedEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AdService, useClass: MockAdService },
        { provide: DeviceService, useClass: mockService(DeviceService) },
        { provide: StoreService, useClass: mockService(StoreService) },
        { provide: WindowService, useClass: mockService(WindowService) }
      ]
    });

    oliService = TestBed.inject(OliService);
    deviceService = TestBed.inject(DeviceService) as ServiceMock<DeviceService>;
    storeService = TestBed.inject(StoreService) as ServiceMock<StoreService>;
    adService = TestBed.inject(AdService) as ServiceMock<AdService>;
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
    slotRenderEndedEvent = {
      size: [300, 250],
      slot,
      isEmpty: false
    } as googletag.events.SlotRenderEndedEvent;
    addEventListener = jest
      .fn()
      .mockImplementation((eventType: string, handler: Function) =>
        handler(slotRenderEndedEvent)
      );
    windowService.getWindow.mockReturnValue({
      googletag: {
        cmd: { push: jest.fn().mockImplementation((func) => func()) },
        defineSlot: jest.fn().mockReturnValue(slot),
        destroySlots: jest.fn().mockReturnValue(true),
        pubads: jest.fn().mockReturnValue({
          enableSingleRequest: jest.fn(),
          refresh: jest.fn(),
          addEventListener
        }),
        companionAds: jest.fn(),
        enableServices: jest.fn()
      },
      digitalData: {
        page: { ads: { environment: "prod" }, pageInfo: { source: "" } }
      },
      location: {
        search: "?cpid=mweb-oli"
      }
    });
    windowService.isDesktopDomain.mockReturnValue(false);
    deviceService.getDevice.mockReturnValue(DeviceType.mobile);
    storeService.get.mockReturnValue(null);
  });

  describe("Frequency Cap", () => {
    it("should show OLI when OLI has never been shown", () => {
      expect(oliService.load(oliSlotConfig).toPromise()).resolves.toBeTruthy();
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

      expect(oliService.load(oliSlotConfig).toPromise()).resolves.toBeTruthy();
    });

    it("should not show overlay when oli has been shown today", () => {
      const endOfToday = formatISO(
        set(new Date(), { hours: 23, minutes: 59, seconds: 59 })
      );
      storeService.get.mockReturnValue(endOfToday);

      expect(oliService.load(oliSlotConfig).toPromise()).rejects.toBeTruthy();
    });

    it("should record oli shown state", async () => {
      const endOfToday = formatISO(
        set(new Date(), { hours: 23, minutes: 59, seconds: 59 })
      );

      await oliService.load(oliSlotConfig).toPromise();

      expect(storeService.set).toHaveBeenCalledWith(
        "oli-hide-until",
        endOfToday
      );
    });
  });

  describe("Device Detection", () => {
    it.each`
      deviceType            | showOli
      ${DeviceType.mobile}  | ${true}
      ${DeviceType.tablet}  | ${false}
      ${DeviceType.bot}     | ${false}
      ${DeviceType.desktop} | ${false}
      ${DeviceType.tv}      | ${false}
      ${DeviceType.unknown} | ${false}
    `("show OLI for $deviceType: $showOli", ({ deviceType, showOli }) => {
      deviceService.getDevice.mockReturnValue(deviceType);
      const oliLoad = oliService.load(oliSlotConfig).toPromise();
      return showOli
        ? expect(oliLoad).resolves.toBeTruthy()
        : expect(oliLoad).rejects.toBeTruthy();
    });
  });

  describe("GPT", () => {
    it("should call GPT properly", async () => {
      const { googletag } = windowService.getWindow();

      await oliService.load(oliSlotConfig).toPromise();

      expect(googletag.cmd.push).toHaveBeenCalledTimes(1);
      expect(googletag.defineSlot).toHaveBeenCalledWith(
        oliSlotConfig.adUnitPath,
        oliSlotConfig.size,
        elementId
      );
      expect(slot.setTargeting).toHaveBeenCalledWith("spade", "true");
      expect(slot.setTargeting).toHaveBeenCalledWith(
        "pos",
        "interstitial-portrait"
      );
      expect(slot.setTargeting).toHaveBeenCalledWith("env", "prod");
      expect(slot.setTargeting).toHaveBeenCalledWith("source", "");
      expect(slot.setTargeting).toHaveBeenCalledWith("cpid", "mweb-oli");
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

    it("should notify subscriber when ads return from gpt", async () => {
      expect.assertions(1);
      slotRenderEndedEvent.isEmpty = false;
      const event = await oliService.load(oliSlotConfig).toPromise();
      expect(event).toEqual(slotRenderEndedEvent);
    });

    it("should send error to subscriber when ads does not return from gpt", async () => {
      expect.assertions(1);
      slotRenderEndedEvent.isEmpty = true;
      try {
        await oliService.load(oliSlotConfig).toPromise();
      } catch (event) {
        expect(event).toEqual(slotRenderEndedEvent);
      }
    });

    it("should send error to subscriber when ad is not loaded within the time limit", async () => {
      jest.useFakeTimers();

      expect.assertions(1);

      try {
        const load = oliService.load(oliSlotConfig).toPromise();
        jest.advanceTimersByTime(5000); // fast-forward time to trigger fail-safe
        await load;
      } catch (error) {
        expect(error).toEqual(expect.any(TimeoutError));
      }
    });

    it("should call googletag.destroySlots() when destroy() is called", async () => {
      slotRenderEndedEvent.isEmpty = false;
      await oliService.load(oliSlotConfig).toPromise();

      expect(oliService.slotRegistry.get(elementId)).toBe(slot);

      oliService.destroy(elementId);
      expect(
        windowService.getWindow().googletag.destroySlots
      ).toHaveBeenCalledWith([slot]);
      expect(oliService.slotRegistry.get(elementId)).toBe(undefined);
    });

    it("should not call googletag.destroySlots() when slot does not exist", async () => {
      oliService.destroy(elementId);
      expect(
        windowService.getWindow().googletag.destroySlots
      ).not.toHaveBeenCalled();
    });
  });

  describe("Error Handling", () => {
    it("has 5-second fail-safe timeout", async () => {
      expect.assertions(1);

      jest.useFakeTimers();
      const load = oliService.load(oliSlotConfig).toPromise();
      jest.advanceTimersByTime(5000); // trigger fail-safe timeout

      try {
        await load;
      } catch (e) {
        expect(e).toEqual(expect.any(TimeoutError));
      }
    });

    it("records shown state after error happend", async () => {
      expect.assertions(1);

      jest.useFakeTimers();
      const load = oliService.load(oliSlotConfig).toPromise();
      jest.advanceTimersByTime(5000); // trigger fail-safe timeout

      try {
        await load;
      } catch (e) {
        expect(storeService.set).toHaveBeenCalled();
      }
    });
  });
});

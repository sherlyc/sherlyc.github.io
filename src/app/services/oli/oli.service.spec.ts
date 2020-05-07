import { TestBed } from "@angular/core/testing";
import { TimeoutError } from "rxjs";
import { AdService } from "../ad/ad.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { WindowService } from "../window/window.service";
import { OliService } from "./oli.service";

class MockAdService {
  load?: Promise<any> = Promise.resolve();
}

describe("Oli service", () => {
  let adService: ServiceMock<AdService>;
  let windowService: ServiceMock<WindowService>;
  let oliService: ServiceMock<OliService>;

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
        { provide: WindowService, useClass: mockService(WindowService) }
      ]
    });

    oliService = TestBed.inject(OliService) as ServiceMock<OliService>;
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
  });

  it("should call GPT properly", async () => {
    const { googletag } = windowService.getWindow();

    await oliService.load("oliAdId").toPromise();

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
    const event = await oliService.load("oliAdId").toPromise();
    expect(event).toEqual(slotRenderEndedEvent);
  });

  it("should send error to subscriber when ads does not return from gpt", async () => {
    expect.assertions(1);
    slotRenderEndedEvent.isEmpty = true;
    try {
      await oliService.load("oliAdId").toPromise();
    } catch (event) {
      expect(event).toEqual(slotRenderEndedEvent);
    }
  });

  it("should send error to subscriber when ad is not loaded within the time limit", async () => {
    jest.useFakeTimers();

    expect.assertions(1);

    try {
      const load = oliService.load("oliAdId").toPromise();
      jest.advanceTimersByTime(5000); // fast-forward time to trigger fail-safe
      await load;
    } catch (error) {
      expect(error).toEqual(expect.any(TimeoutError));
    }
  });
});

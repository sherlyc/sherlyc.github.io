import { TestBed } from "@angular/core/testing";
import { OliService } from "./oli.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { AdService } from "../ad/ad.service";
import { WindowService } from "../window/window.service";

class MockAdService {
  load?: Promise<any> = Promise.resolve();
}

describe("Oli service", () => {
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
        { provide: WindowService, useClass: mockService(WindowService) }
      ]
    });

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
    const service = TestBed.inject(OliService) as ServiceMock<OliService>;

    await service.load("oliAdId").toPromise();

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

  it("should notify subscriber when ads return from gpt", (done) => {
    slotRenderEndedEvent.isEmpty = false;
    const service = TestBed.inject(OliService) as ServiceMock<OliService>;

    service.load("oliAdId").subscribe({
      next: (event) => {
        expect(event).toEqual(slotRenderEndedEvent);
      },
      complete: () => done()
    });
  });

  it("should send error to subscriber when ads does not return from gpt", (done) => {
    slotRenderEndedEvent.isEmpty = true;
    const service = TestBed.inject(OliService) as ServiceMock<OliService>;

    service.load("oliAdId").subscribe({
      error: (event) => {
        expect(event).toEqual(slotRenderEndedEvent);
      },
      complete: () => done()
    });
  });
});

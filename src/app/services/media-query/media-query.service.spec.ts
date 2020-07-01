import { TestBed } from "@angular/core/testing";

import { DeviceType } from "../../../../common/DeviceType";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { MediaQueryService } from "./media-query.service";

type MediaQueryListEventListener = (event: MediaQueryListEvent) => void;
describe("MediaQueryService", () => {
  let desktopListener: MediaQueryListEventListener;
  let tabletListener: MediaQueryListEventListener;
  let mobileListener: MediaQueryListEventListener;
  const desktopMediaQueryList = {
    matches: false,
    addEventListener: (type: string, listener: MediaQueryListEventListener) =>
      (desktopListener = listener),
    removeEventListener: (
      type: string,
      listener: MediaQueryListEventListener
      // @ts-ignore
    ) => (desktopListener = undefined)
  };
  const tabletMediaQueryList = {
    matches: false,
    addEventListener: (type: string, listener: MediaQueryListEventListener) =>
      (tabletListener = listener),
    removeEventListener: (
      type: string,
      listener: MediaQueryListEventListener
      // @ts-ignore
    ) => (tabletListener = undefined)
  };
  const mobileMediaQueryList = {
    matches: false,
    addEventListener: (type: string, listener: MediaQueryListEventListener) =>
      (mobileListener = listener),
    removeEventListener: (
      type: string,
      listener: MediaQueryListEventListener
      // @ts-ignore
    ) => (mobileListener = undefined)
  };
  const matchMedia = jest.fn();
  window.matchMedia = matchMedia;

  let runtimeService: ServiceMock<RuntimeService>;
  let service: MediaQueryService;

  beforeEach(() => {
    matchMedia.mockReturnValueOnce(desktopMediaQueryList);
    matchMedia.mockReturnValueOnce(tabletMediaQueryList);
    matchMedia.mockReturnValueOnce(mobileMediaQueryList);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    });
    service = TestBed.inject(MediaQueryService);
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should detect device from break points at the first time", () => {
    runtimeService.isBrowser.mockReturnValue(true);

    service.subscribe((device) => {
      expect(device).toEqual(DeviceType.mobile);
    });
  });

  it("should detect device from break points when break point changes", () => {
    runtimeService.isBrowser.mockReturnValue(true);

    const subscriber = jest.fn();
    service.subscribe(subscriber);

    expect(subscriber).toHaveBeenCalledWith(DeviceType.desktop);

    mobileListener({ matches: true } as MediaQueryListEvent);
    expect(subscriber).toHaveBeenCalledWith(DeviceType.mobile);

    tabletListener({ matches: true } as MediaQueryListEvent);
    expect(subscriber).toHaveBeenCalledWith(DeviceType.tablet);

    desktopListener({ matches: true } as MediaQueryListEvent);
    expect(subscriber).toHaveBeenCalledWith(DeviceType.desktop);

    tabletListener({ matches: true } as MediaQueryListEvent);
    expect(subscriber).toHaveBeenCalledWith(DeviceType.tablet);
  });

  it("should remove listeners when destroy", () => {
    runtimeService.isBrowser.mockReturnValue(true);

    expect(desktopListener).toBeTruthy();
    expect(mobileListener).toBeTruthy();
    expect(mobileListener).toBeTruthy();

    service.ngOnDestroy();

    expect(desktopListener).toBeFalsy();
    expect(mobileListener).toBeFalsy();
    expect(mobileListener).toBeFalsy();
  });
});

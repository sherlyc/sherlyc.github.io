import { TestBed } from "@angular/core/testing";
import { ServiceMock } from "../mocks/MockService";
import { ServerWindowService, WindowService } from "./window.service";

describe("WindowService", () => {
  let windowService: ServiceMock<WindowService>;

  beforeAll(() => {
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
  });

  it("should be created", () => {
    expect(windowService).toBeTruthy();
  });

  it("should return the window", () => {
    expect(windowService.getWindow()).toEqual(window);
  });

  it("should return localStorage", () => {
    expect(windowService.getLocalStorage()).toEqual(window.localStorage);
  });

  describe("isDesktopDomain", () => {
    const { location } = window;

    beforeAll(() => {
      delete window.location;
      Object.defineProperty(window, "location", {
        value: {
          hostname: ""
        },
        writable: true
      });
    });

    afterAll(() => {
      window.location = location;
    });

    it.each([["www.stuff.co.nz"], ["www-preprod.stuff.co.nz"]])(
      "should return true when in %s",
      (hostname: string) => {
        window.location.hostname = hostname;

        expect(windowService.isDesktopDomain()).toBeTruthy();
      }
    );

    it.each([
      ["i.stuff.co.nz"],
      ["experience.expproduction.shift21.ffx.nz"],
      ["localhost"]
    ])("should return false when in %s", (hostname: string) => {
      window.location.hostname = hostname;

      expect(windowService.isDesktopDomain()).toBeFalsy();
    });
  });
});

describe("ServerWindowService", () => {
  let serverWindowService: ServiceMock<ServerWindowService>;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [ServerWindowService]
    });
    serverWindowService = TestBed.inject(ServerWindowService) as ServiceMock<
      ServerWindowService
    >;
  });

  it("should be created", () => {
    expect(serverWindowService).toBeTruthy();
  });

  it("should return an empty object for the window", () => {
    expect(serverWindowService.getWindow()).toEqual({});
  });

  it("should throw an error when isDesktopDomain is called", () => {
    expect(() => serverWindowService.isDesktopDomain()).toThrowError();
  });
});

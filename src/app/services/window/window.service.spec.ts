import { TestBed } from "@angular/core/testing";
import { ServerWindowService, WindowService } from "./window.service";

describe("WindowService", () => {
  let windowService: WindowService;

  beforeAll(() => {
    windowService = TestBed.get(WindowService);
  });

  it("should be created", () => {
    expect(windowService).toBeTruthy();
  });

  it("should return the window", () => {
    expect(windowService.getWindow()).toEqual(window);
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
  let serverWindowService: ServerWindowService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [ServerWindowService]
    });
    serverWindowService = TestBed.get(ServerWindowService);
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

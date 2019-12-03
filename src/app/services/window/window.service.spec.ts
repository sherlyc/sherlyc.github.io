import { TestBed } from "@angular/core/testing";
import { WindowService, ServerWindowService } from "./window.service";

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
});

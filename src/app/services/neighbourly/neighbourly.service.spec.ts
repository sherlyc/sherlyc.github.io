import { TestBed } from "@angular/core/testing";
import { NeighbourlyService } from "./neighbourly.service";
import { ServiceMock, mockService } from "../mocks/MockService";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { RuntimeService } from "../runtime/runtime.service";
import { ScriptId } from "../script-injector/__types__/ScriptId";
import { Position } from "../script-injector/__types__/Position";

describe("NeighbourlyService", () => {
  let neighbourlyService: NeighbourlyService;
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: ScriptInjectorService,
          useClass: mockService(ScriptInjectorService)
        }
      ]
    });
    scriptInjectorService = TestBed.get(ScriptInjectorService);
    runtimeService = TestBed.get(RuntimeService);
    neighbourlyService = TestBed.get(NeighbourlyService);
  });

  it("should be created", () => {
    expect(neighbourlyService).toBeTruthy();
  });

  it("should load scripts in browser", async () => {
    runtimeService.isBrowser.mockReturnValue(true);

    await neighbourlyService.setup();

    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      ScriptId.neighbourlyLocalStories,
      "https://cdn.neighbourly.co.nz/js/neighbourly-stuff-strap.js",
      Position.BOTTOM
    );
    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      ScriptId.neighbourlyTopStories,
      "https://cdn.neighbourly.co.nz/js/neighbourly-stuff-widget-init.js",
      Position.BOTTOM
    );
  });

  it("should not load scripts in server", async () => {
    runtimeService.isBrowser.mockReturnValue(false);

    await neighbourlyService.setup();

    expect(scriptInjectorService.load).not.toHaveBeenCalled();
  });
});

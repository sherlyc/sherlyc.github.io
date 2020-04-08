import { TestBed } from "@angular/core/testing";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { Position } from "../script-injector/__types__/Position";
import { ScriptId } from "../script-injector/__types__/ScriptId";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { NeighbourlyService } from "./neighbourly.service";

describe("NeighbourlyService", () => {
  let neighbourlyService: ServiceMock<NeighbourlyService>;
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
    scriptInjectorService = TestBed.inject(
      ScriptInjectorService
    ) as ServiceMock<ScriptInjectorService>;
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    neighbourlyService = TestBed.inject(NeighbourlyService) as ServiceMock<
      NeighbourlyService
    >;
  });

  it("should be created", () => {
    expect(neighbourlyService).toBeTruthy();
  });

  it("should load scripts in browser", async () => {
    runtimeService.isServer.mockReturnValue(false);

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
    runtimeService.isServer.mockReturnValue(true);

    await neighbourlyService.setup();

    expect(scriptInjectorService.load).not.toHaveBeenCalled();
  });
});

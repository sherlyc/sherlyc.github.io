import { TestBed } from "@angular/core/testing";
import { LoggerService } from "../logger/logger.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { Position } from "./__types__/Position";
import { ScriptId } from "./__types__/ScriptId";

import { ScriptInjectorService } from "./script-injector.service";

describe("ScriptInjectorService", () => {
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        }
      ]
    });
    scriptInjectorService = TestBed.inject(
      ScriptInjectorService
    ) as ServiceMock<ScriptInjectorService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.getElementsByTagName("html")[0].innerHTML = "";
  });

  it("should be created", () => {
    expect(scriptInjectorService).toBeTruthy();
  });

  it("should create a script element in the head", () => {
    const id = "test-script-id" as ScriptId;
    const src = "__fixtures__/test-script.js";

    scriptInjectorService.load(id, src, Position.HEAD);

    const element = document.getElementById(id);
    expect(element).toBeTruthy();
    expect(element).toBeInstanceOf(HTMLScriptElement);
    expect(element!.getAttribute("src")).toEqual(src);
    expect(element!.parentElement).toBeInstanceOf(HTMLHeadElement);
  });

  it("should create a script element in the body", () => {
    const id = "test-script-id" as ScriptId;
    const src = "__fixtures__/test-script.js";

    scriptInjectorService.load(id, src, Position.BOTTOM);

    const element = document.getElementById(id);
    expect(element).toBeTruthy();
    expect(element).toBeInstanceOf(HTMLScriptElement);
    expect(element!.getAttribute("src")).toEqual(src);
    expect(element!.parentElement).toBeInstanceOf(HTMLBodyElement);
  });
});

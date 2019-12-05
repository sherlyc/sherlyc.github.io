import { TestBed } from "@angular/core/testing";
import { GlobalStyleService } from "./global-style.service";
import { ServiceMock } from "../mocks/MockService";
import * as cxs from "cxs";

jest.mock("cxs");

describe("Global Css service", () => {
  let globalStyleService: ServiceMock<GlobalStyleService>;

  beforeEach(() => {
    globalStyleService = TestBed.get(GlobalStyleService);
  });

  it("should be created", () => {
    expect(globalStyleService).toBeTruthy();
  });

  it("should load with the correct style prefix", () => {
    const stylePrefix = globalStyleService.stylePrefix();

    expect(cxs.prefix).toHaveBeenCalledWith(stylePrefix);
  });

  describe("injectStyle", () => {
    it("should inject css via cxs", () => {
      const fakeResult = "fakeResult";

      (cxs as jest.Mock).mockReturnValue(fakeResult);

      const style = {};
      const result = globalStyleService.injectStyle(style);

      expect(cxs).toHaveBeenCalledWith(style);
      expect(result).toEqual(fakeResult);
    });
  });

  describe("getStyles", () => {
    it("returns css rules", () => {
      const fakeResult = "fakeResult";
      (cxs.css as jest.Mock).mockReturnValueOnce(fakeResult);
      const result = globalStyleService.getStyles();
      expect(result).toBe(fakeResult);
    });
  });
});

import { TestBed } from "@angular/core/testing";
import * as cxs from "cxs";
import { ServiceMock } from "../mocks/MockService";
import { GlobalStyleService } from "./global-style.service";

jest.mock("cxs");

describe("Global Css service", () => {
  let globalStyleService: ServiceMock<GlobalStyleService>;
  const detachStyleSpy = jest.spyOn(
    GlobalStyleService.prototype,
    "detachStyle"
  );

  beforeEach(() => {
    jest.clearAllMocks();
    globalStyleService = TestBed.get(GlobalStyleService);
  });

  it("should be created", () => {
    expect(globalStyleService).toBeTruthy();
  });

  it("should detach any existing styles", () => {
    expect(detachStyleSpy).toHaveBeenCalledTimes(1);
  });

  it("should load with the correct style prefix", () => {
    const stylePrefix = globalStyleService.stylePrefix();

    expect(cxs.prefix).toHaveBeenCalledWith(stylePrefix);
  });

  describe("injectStyle", () => {
    it("should inject css via cxs", () => {
      (cxs as jest.Mock).mockReturnValue("fakeCSSRules");

      const style = {};
      const result = globalStyleService.injectStyle(style);

      expect(cxs).toHaveBeenCalledWith(style);
      expect(result).toEqual("fakeCSSRules");
    });
  });

  describe("attachStyle", () => {
    it("adds style tag to the document head", () => {
      (cxs.css as jest.Mock).mockReturnValueOnce("fakeCSSRules");

      globalStyleService.attachStyle();

      const style = document.head.querySelector(
        "style[id$=-global-style]"
      ) as HTMLStyleElement;
      expect(style.textContent).toBe("fakeCSSRules");
    });
  });

  describe("detachStyle", () => {
    it("removes style tag to the document head", () => {
      (cxs.css as jest.Mock).mockReturnValueOnce("fakeCSSRules");

      globalStyleService.attachStyle();

      expect(document.head.querySelector("style[id$=-global-style]")).not.toBe(
        null
      );

      globalStyleService.detachStyle();

      expect(document.head.querySelector("style[id$=-global-style]")).toBe(
        null
      );
    });
  });
});

import { TestBed } from "@angular/core/testing";
import { storeNamespace, StoreService } from "./store.service";
import { WindowService } from "../window/window.service";
import { mockService, ServiceMock } from "../mocks/MockService";

describe("Store Service", () => {
  describe("get and set", () => {
    let storeService: StoreService;
    let windowService: WindowService;
    beforeEach(() => {
      windowService = TestBed.get(WindowService);
      storeService = TestBed.get(StoreService);
    });

    afterEach(() => {
      windowService.getLocalStorage().clear();
    });

    it.each([["value"], [1], [true], [null], [{ test: "value" }]])(
      "should get value that was set",
      (value) => {
        expect(storeService.get("key")).toEqual(null);
        storeService.set("key", value);
        expect(storeService.get("key")).toEqual(value);
      }
    );

    it("should remove value from local storage when set with undefined", () => {
      storeService.set("key", "value");
      expect(storeService.get("key")).toEqual("value");
      storeService.set("key", undefined);
      expect(storeService.get("key")).toEqual(null);
    });
  });

  describe("key prefix", () => {
    let windowService: ServiceMock<WindowService>;
    let storeService: StoreService;
    const getMock = jest.fn();
    const setMock = jest.fn();
    const removeMock = jest.fn();
    beforeEach(() => {
      jest.clearAllMocks();
      TestBed.configureTestingModule({
        providers: [
          {
            provide: WindowService,
            useClass: mockService(WindowService)
          }
        ]
      });
      windowService = TestBed.get(WindowService);
      storeService = TestBed.get(StoreService);
      windowService.getLocalStorage.mockReturnValue({
        getItem: getMock,
        setItem: setMock,
        removeItem: removeMock
      });
    });

    it("should get data from local storage", () => {
      const key = "itemKey";
      const value = "value";
      getMock.mockReturnValue(JSON.stringify(value));

      storeService.get(key);

      expect(getMock).toHaveBeenCalledWith(`${storeNamespace}${key}`);
    });

    it("should save data to local storage", () => {
      const key = "itemKey";
      const value = "value";

      storeService.set(key, value);

      expect(setMock).toHaveBeenCalledWith(
        `${storeNamespace}${key}`,
        JSON.stringify(value)
      );
    });
  });
});

import { TestBed } from "@angular/core/testing";
import { storeNamespace, StoreService } from "./store.service";
import { WindowService } from "../window/window.service";
import { mockService, ServiceMock } from "../mocks/MockService";

describe("Store Service should", () => {
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

  it.each([["itemValue"], [1], [true], [null], [{ test: "value" }]])(
    "should get data from local storage for value %s",
    (value) => {
      const key = "itemKey";
      getMock.mockReturnValue(JSON.stringify(value));

      const result = storeService.get(key);
      expect(result).toEqual(value);
      expect(getMock).toHaveBeenCalledWith(`${storeNamespace}${key}`);
    }
  );

  it.each([["itemValue"], [10], [false], [null], [{ something: "theValue" }]])(
    "should save data to local storage",
    (value) => {
      const key = "itemKey";

      storeService.set(key, value);

      expect(setMock).toHaveBeenCalledWith(
        `${storeNamespace}${key}`,
        JSON.stringify(value)
      );
    }
  );

  it("should return raw value if unable to parse", () => {
    const key = "itemKey";
    const value = "aValue";
    getMock.mockReturnValue(value);

    const result = storeService.get(key);
    expect(result).toEqual(value);
    expect(getMock).toHaveBeenCalledWith(`${storeNamespace}${key}`);
  });

  it("should remove item if set with undefined", () => {
    const key = "itemKey";
    const value = undefined;

    storeService.set(key, value);

    expect(setMock).not.toHaveBeenCalled();
    expect(removeMock).toHaveBeenCalledWith(`${storeNamespace}${key}`);
  });
});

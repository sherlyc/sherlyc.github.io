import { TestBed } from "@angular/core/testing";
import * as store from "store";
import { StoreService } from "./store.service";

jest.mock("store");

describe("Store Service should", () => {
  let storeService: StoreService;
  const storeGetMock = jest.fn();
  const storeSetMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (store.namespace as jest.Mock).mockReturnValue({
      get: storeGetMock,
      set: storeSetMock
    });
    storeService = TestBed.get(StoreService);
  });

  it("should get data from local storage", () => {
    const key = "itemKey";
    const value = "itemValue";
    storeGetMock.mockReturnValue("itemValue");

    const result = storeService.get(key);

    expect(result).toEqual(value);
    expect(storeGetMock).toHaveBeenCalledWith(key);
  });

  it("should save data to local storage", () => {
    const key = "itemKey";
    const value = "itemValue";

    storeService.set(key, value);

    expect(storeSetMock).toHaveBeenCalledWith(key, value);
  });
});

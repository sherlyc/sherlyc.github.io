import { DeviceType } from "../../../../common/DeviceType";
import { ISwitchConfig } from "../../__types__/ISwitchConfig";
import { isSwitchedOn } from "./switch-resolver";

describe("Switch Resolver", () => {
  it("should return true if device is in list and lottery number is in public range", () => {
    const switchConfig: ISwitchConfig = {
      devices: [DeviceType.tablet],
      public: {
        min: 0,
        max: 10
      },
      internal: 404
    };
    expect(isSwitchedOn(10, DeviceType.tablet, switchConfig)).toBe(true);
  });

  it("should return true if device is in list and lottery number matches internal number", () => {
    const switchConfig: ISwitchConfig = {
      devices: [DeviceType.desktop],
      public: {
        min: 0,
        max: 10
      },
      internal: 404
    };
    expect(isSwitchedOn(10, DeviceType.desktop, switchConfig)).toBe(true);
  });

  it("should return true if there is no device list and lottery number is in range", () => {
    const switchConfig: ISwitchConfig = {
      public: {
        min: 0,
        max: 10
      },
      internal: 404
    };
    expect(isSwitchedOn(10, DeviceType.mobile, switchConfig)).toBe(true);
  });

  it("should return false if device is not in devices list", () => {
    const switchConfig: ISwitchConfig = {
      devices: [DeviceType.mobile],
      public: {
        min: 0,
        max: 10
      },
      internal: 404
    };
    expect(isSwitchedOn(5, DeviceType.tablet, switchConfig)).toBe(false);
  });

  it("should return false if device is in list but lottery number is not in range and does not match internal number", () => {
    const switchConfig: ISwitchConfig = {
      devices: [DeviceType.mobile],
      public: {
        min: 0,
        max: 10
      },
      internal: 404
    };
    expect(isSwitchedOn(11, DeviceType.mobile, switchConfig)).toBe(false);
  });
});

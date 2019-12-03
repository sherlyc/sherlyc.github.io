import * as configJson from "./__fixtures__/config.json";
import * as strapConfig from "./__fixtures__/strapConfig.json";
import { IFeaturesConfig } from "../__types__/IFeaturesConfig";
import { FeatureName } from "../../../common/FeatureName";

const featureProdMock: IFeaturesConfig = {
  ["Feature" as FeatureName]: {
    public: {
      min: 1,
      max: 50
    },
    internal: 404
  }
} as IFeaturesConfig;

const featureStagingMock: IFeaturesConfig = {
  ["Feature" as FeatureName]: {
    public: {
      min: 1,
      max: 100
    },
    internal: 500
  }
} as IFeaturesConfig;

jest.mock("../../config.json", () => configJson);
jest.mock("../../strapConfig.json", () => strapConfig);
jest.mock("../../featuresConfig/features-prod.json", () => featureProdMock);
jest.mock(
  "../../featuresConfig/features-staging.json",
  () => featureStagingMock
);

describe("Config Service", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should load config based on environment variable", () => {
    process.env.SPADE_ENV = "staging";

    const config = require("./config").default;

    expect(config).toEqual({
      ...configJson["staging"],
      strapConfig,
      features: featureStagingMock
    });
  });

  it("should fall back to production configuration when environment variable is not present", () => {
    delete process.env.SPADE_ENV;

    const config = require("./config").default;

    expect(config).toEqual({
      ...configJson["production"],
      strapConfig,
      features: featureProdMock
    });
  });

  it("should fall back to production configuration when environment variable is not valid", () => {
    process.env.SPADE_ENV = "something";

    const config = require("./config").default;

    expect(config).toEqual({
      ...configJson["production"],
      strapConfig,
      features: featureProdMock
    });
  });
});

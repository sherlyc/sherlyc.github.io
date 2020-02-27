import { inRange, range } from "lodash";
import { DeviceType } from "../../../../common/DeviceType";
import { FeatureName } from "../../../../common/FeatureName";
import { isFeatureEnabled } from "./feature";

describe("Feature service", () => {
  const testCases: { [key in FeatureName]: [number, number] } = {
    [FeatureName.Recommendation]: [-1, -1],
    [FeatureName.RecommendationDisplay]: [-1, -1],
    [FeatureName.StrapLayout]: [-1, -1],
    [FeatureName.ModuleLayout]: [0, 20],
    [FeatureName.HomepageTakeover]: [-1, -1]
  };

  Object.entries(testCases).forEach(([featureName, [min, max]]) => {
    range(-10, 110).forEach((rangeValue) => {
      const shouldBeOn = inRange(rangeValue, min, max + 1);
      it(`${featureName} should be ${
        shouldBeOn ? "on" : "off"
      } when lotto is ${rangeValue}`, () => {
        const result = isFeatureEnabled(
          featureName,
          rangeValue,
          DeviceType.unknown
        );
        expect(result).toEqual(shouldBeOn);
      });
    });
  });
});

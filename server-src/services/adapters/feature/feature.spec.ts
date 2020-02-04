import { isFeatureEnabled } from "./feature";
import { DeviceType } from "../../../../common/DeviceType";
import { range, inRange } from "lodash";
import { FeatureName } from "../../../../common/FeatureName";

describe("Feature service", () => {
  const testCases: { [key in FeatureName]: [number, number] } = {
    [FeatureName.Recommendation]: [-1, -1],
    [FeatureName.RecommendationDisplay]: [-1, -1],
    [FeatureName.AdsRelativePositioning]: [1, 100],
    [FeatureName.StrapLayout]: [-1, -1],
    [FeatureName.ModuleLayout]: [-1, -1],
    [FeatureName.LoginFlow]: [1, 100]
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

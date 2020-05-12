import inRange from "lodash-es/inRange";
import range from "lodash-es/range";
import { DeviceType } from "../../../../common/DeviceType";
import { FeatureName } from "../../../../common/FeatureName";
import { isFeatureEnabled } from "./feature";

describe("Feature service", () => {
  const testCases: { [key in FeatureName]: [number, number] } = {
    [FeatureName.Placeholder]: [-1, -1],
    [FeatureName.HomepageV2]: [-1, -1]
  };

  Object.entries(testCases).forEach(([featureName, [min, max]]) => {
    range(-1, 101).forEach((rangeValue) => {
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

  it("HomepageV2 should be on for internal number 404", () => {
    expect(isFeatureEnabled(
      FeatureName.HomepageV2,
      404,
      DeviceType.unknown
    )).toBeTruthy();
  });
});

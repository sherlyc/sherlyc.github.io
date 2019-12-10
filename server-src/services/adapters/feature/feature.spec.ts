import { isFeatureEnabled } from "./feature";
import { DeviceType } from "../../../../common/DeviceType";
import { FeatureName } from "../../../../common/FeatureName";

describe("Feature service", () => {
  describe("Recommendations", () => {
    it("should return true for internal lottery number 404", async () => {
      const result = await isFeatureEnabled(
        FeatureName.Recommendation,
        404,
        DeviceType.unknown
      );

      expect(result).toBe(true);
    });

    it.each([[1], [100]])(
      "should return false for public lottery number %i",
      async (lotteryNumber: number) => {
        const result = await isFeatureEnabled(
          FeatureName.Recommendation,
          lotteryNumber,
          DeviceType.unknown
        );

        expect(result).toBe(false);
      }
    );
  });

  describe("Recommendations Display", () => {
    it("should return true for internal lottery number 404", async () => {
      const result = await isFeatureEnabled(
        FeatureName.RecommendationDisplay,
        404,
        DeviceType.unknown
      );

      expect(result).toBe(true);
    });

    it.each([[1], [100]])(
      "should return false for public lottery number %i",
      async (lotteryNumber: number) => {
        const result = await isFeatureEnabled(
          FeatureName.RecommendationDisplay,
          lotteryNumber,
          DeviceType.unknown
        );

        expect(result).toBe(false);
      }
    );
  });

  describe("Load Adobe Launch script", () => {
    it("should return true for internal lottery number 404", async () => {
      const result = await isFeatureEnabled(
        FeatureName.AdobeLaunch,
        404,
        DeviceType.unknown
      );

      expect(result).toBe(true);
    });

    it.each([[1], [100]])(
      "should return true for public lottery number %i",
      async (lotteryNumber: number) => {
        const result = await isFeatureEnabled(
          FeatureName.AdobeLaunch,
          lotteryNumber,
          DeviceType.unknown
        );

        expect(result).toBe(true);
      }
    );
  });

  describe("Show old layout", () => {
    it("should return true for internal lottery number 404", async () => {
      const result = await isFeatureEnabled(
        FeatureName.ShowOldLayout,
        404,
        DeviceType.unknown
      );

      expect(result).toBe(true);
    });

    it.each([[1], [100]])(
      "should return true for public lottery number %i",
      async (lotteryNumber: number) => {
        const result = await isFeatureEnabled(
          FeatureName.ShowOldLayout,
          lotteryNumber,
          DeviceType.unknown
        );

        expect(result).toBe(true);
      }
    );
  });

  describe("Show new layout", () => {
    it("should return true for internal lottery number 404", async () => {
      const result = await isFeatureEnabled(
        FeatureName.ShowNewLayout,
        404,
        DeviceType.unknown
      );

      expect(result).toBe(true);
    });

    it.each([[1], [100]])(
      "should return false for public lottery number %i",
      async (lotteryNumber: number) => {
        const result = await isFeatureEnabled(
          FeatureName.ShowNewLayout,
          lotteryNumber,
          DeviceType.unknown
        );

        expect(result).toBe(false);
      }
    );
  });
});

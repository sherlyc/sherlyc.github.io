import { FeatureName } from '../../common/FeatureName';

export const isFeatureEnabled = (
  feature: FeatureName,
  lotteryNumber: number
): boolean => {
  switch (feature) {
    default:
      return false;
  }
};

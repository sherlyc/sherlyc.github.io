import { FeatureName } from '../../common/FeatureName';

export const isFeatureEnabled = (
  feature: FeatureName,
  lotteryNumber: number
): boolean => {
  switch (feature) {
    case FeatureName.playStuffWidget:
      return true;
    default:
      return false;
  }
};

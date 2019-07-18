import { FeatureName } from '../../common/FeatureName';

export const isFeatureEnabled = (
  feature: FeatureName,
  lotteryNumber: number
): boolean => {
  switch (feature) {
    case FeatureName.VideoHubFeature:
      return process.env.SPADE_ENV !== 'production' && lotteryNumber === 404;
    default:
      return false;
  }
};

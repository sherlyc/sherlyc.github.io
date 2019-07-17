import { FeatureNames } from '../../common/FeatureNames';
import { Experiments } from '../../common/Experiments';

export const getExperimentVariant = (
  name: string,
  lotteryNumber: number
): string | boolean => {
  switch (name) {
    case Experiments.Users:
      return 'control';
    case FeatureNames.HeadlineFlagsFeature:
      return lotteryNumber === 404;
    default:
      return 'control';
  }
};

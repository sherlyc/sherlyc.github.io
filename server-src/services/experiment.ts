import { Features } from '../../common/Features';
import { Experiments } from '../../common/Experiments';

export const getExperimentVariant = (
  name: string,
  lotteryNumber: number
): string | boolean => {
  switch (name) {
    case Experiments.Users:
      return 'control';
    case Features.HeadlineFlagsFeature:
    case Features.VideoHubFeature:
      return lotteryNumber === 404;
    default:
      return 'control';
  }
};

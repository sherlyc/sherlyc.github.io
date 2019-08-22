import { Experiments } from '../../common/Experiments';

export const getExperimentVariant = (
  name: string,
  lotteryNumber: number
): string => {
  switch (name) {
    case Experiments.Users:
      if (lotteryNumber === 404) {
        return Experiments.TopStoriesVisualExperiment;
      }
      return 'control';
    case Experiments.TopStoriesVisualExperiment:
      return lotteryNumber === 404 ? 'groupOne' : 'control';
    default:
      return 'control';
  }
};

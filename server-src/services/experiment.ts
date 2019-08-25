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
      if (lotteryNumber === 404) {
        return 'groupOne';
      } else if (lotteryNumber === 505) {
        return 'groupTwo';
      }
      return 'control';
    default:
      return 'control';
  }
};

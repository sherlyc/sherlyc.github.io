import { Experiments } from '../../common/Experiments';
import { DeviceType } from '../../common/DeviceType';

export const getExperimentVariant = (
  name: string,
  lotteryNumber: number,
  deviceType: DeviceType
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

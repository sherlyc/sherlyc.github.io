import { getExperimentVariant } from './experiment';
import { Experiments } from '../../common/Experiments';
import { DeviceType } from '../../common/DeviceType';

describe('Experiment service', () => {
  it('should return control when lottery number is not 404 for Users', () => {
    const variant = 'control';
    const experimentName = Experiments.Users;
    const lotteryNumber = 1;
    expect(
      getExperimentVariant(experimentName, lotteryNumber, DeviceType.unknown)
    ).toEqual(variant);
  });

  it('should return TopStoriesVisualExperiment when lottery number is 404 for Users', () => {
    const experimentName = Experiments.Users;
    const lotteryNumber = 404;
    expect(
      getExperimentVariant(experimentName, lotteryNumber, DeviceType.unknown)
    ).toEqual(Experiments.TopStoriesVisualExperiment);
  });

  it('should return groupOne when lottery number is 404 for TopStoriesVisualExperiment', () => {
    const variant = 'groupOne';
    const experimentName = Experiments.TopStoriesVisualExperiment;
    const lotteryNumber = 404;
    expect(
      getExperimentVariant(experimentName, lotteryNumber, DeviceType.unknown)
    ).toEqual(variant);
  });

  it('should return control when lottery number is not 404 or 505 for TopStoriesVisualExperiment', () => {
    const variant = 'control';
    const experimentName = Experiments.TopStoriesVisualExperiment;
    const lotteryNumber = 1;
    expect(
      getExperimentVariant(experimentName, lotteryNumber, DeviceType.unknown)
    ).toEqual(variant);
  });

  it('should return groupTwo when lottery number is 505 for TopStoriesVisualExperiment', () => {
    const variant = 'groupTwo';
    const experimentName = Experiments.TopStoriesVisualExperiment;
    const lotteryNumber = 505;
    expect(
      getExperimentVariant(experimentName, lotteryNumber, DeviceType.unknown)
    ).toEqual(variant);
  });

  it('should return control for other experiments', () => {
    const variant = 'control';
    const experimentName = 'Random experiment';
    const lotteryNumber = 1;
    expect(
      getExperimentVariant(experimentName, lotteryNumber, DeviceType.unknown)
    ).toEqual(variant);
  });
});

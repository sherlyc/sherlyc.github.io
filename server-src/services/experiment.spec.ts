import { getExperimentVariant } from './experiment';
import { Experiments } from '../../common/Experiments';

describe('Experiment service', () => {
  it('should return TopStoriesVisualExperiment when lottery number is 404', () => {
    const experimentName = Experiments.Users;
    const lotteryNumber = 404;
    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
      Experiments.TopStoriesVisualExperiment
    );
  });

  it('should return groupOne when lottery number is 404 for TopStoriesVisualExperiment', () => {
    const variant = 'groupOne';
    const experimentName = Experiments.TopStoriesVisualExperiment;
    const lotteryNumber = 404;
    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
      variant
    );
  });

  it('should return control when lottery number is not 404 for TopStoriesVisualExperiment', () => {
    const variant = 'control';
    const experimentName = Experiments.TopStoriesVisualExperiment;
    const lotteryNumber = 1;
    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
      variant
    );
  });

  it('should return control for other experiments', () => {
    const variant = 'control';
    const experimentName = 'Random experiment';
    const lotteryNumber = 1;
    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
      variant
    );
  });
});

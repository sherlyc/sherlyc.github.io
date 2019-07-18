import { getExperimentVariant } from './experiment';

describe('Experiment service', () => {
  it('should return control', () => {
    const variant = 'control';
    const experimentName = 'Eagle';
    const lotteryNumber = 23;
    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
      variant
    );
  });
});

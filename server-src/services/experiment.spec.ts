import { getExperimentVariant } from './experiment';
import { Features } from '../../common/Features';

describe('Experiment service', () => {
  it('should return control', () => {
    const variant = 'control';
    const experimentName = 'Eagle';
    const lotteryNumber = 23;
    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
      variant
    );
  });

  it('should return true for HeadlineFlagsFeature if lottery matches', () => {
    expect(getExperimentVariant(Features.HeadlineFlagsFeature, 404)).toEqual(
      true
    );
  });

  it('should return false for HeadlineFlagsFeature if lottery does not match', () => {
    expect(getExperimentVariant(Features.HeadlineFlagsFeature, 99)).toEqual(
      false
    );
  });
});

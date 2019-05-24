import { getExperimentVariant } from './experiment';

describe('Experiment service', () => {
  let experimentName = 'Parrot';
  let lotteryNumber = 0;

  it('should assign variant of redHeadline when lottery number is between 0 and 32', () => {
    lotteryNumber = 32;
    const variant = 'redHeadline';

    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(variant);
  });

  it('should assign variant of greenHeadline when lottery number is between 33 and 66', () => {
    lotteryNumber = 66;
    const variant = 'greenHeadline';

    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(variant);
  });

  it('should assign variant Control when lottery number is between 67 and 99', () => {
    lotteryNumber = 67;
    const variant = 'control';

    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(variant);

    lotteryNumber = 99;
    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(variant);
  });

  it('should throw an error when the experiment.service.spec.ts does not exists', () => {
    experimentName = 'Eagle';
    lotteryNumber = 23;

    expect(() => {
      getExperimentVariant(experimentName, lotteryNumber);
    }).toThrowError(
      `Bad experiment input data provided: name [Eagle], lotteryNumber [23]`
    );
  });
});

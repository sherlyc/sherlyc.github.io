import { getExperimentVariant } from './experiment';

describe('Experiment service', () => {
  let lotteryNumber = 0;

  it('should assign variant control if the experiment does not exist', () => {
    const variant = 'control';
    const experimentName = 'Eagle';
    lotteryNumber = 23;

    expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
      variant
    );
  });

  describe('Parrot', () => {
    const experimentName = 'Parrot';

    it('should assign variant of redHeadline when lottery number is between 1 and 17', () => {
      lotteryNumber = 17;
      const variant = 'redHeadline';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });

    it('should assign variant of greenHeadline when lottery number is between 18 and 34', () => {
      lotteryNumber = 34;
      const variant = 'greenHeadline';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });

    it('should assign variant Control when lottery number is between 35 and 50', () => {
      lotteryNumber = 50;
      const variant = 'control';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });
  });

  describe('Toucan', () => {
    const experimentName = 'Toucan';

    it('should assign variant of purpleHeadline when lottery number is between 51 and 67', () => {
      lotteryNumber = 67;
      const variant = 'purpleHeadline';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });

    it('should assign variant of orangeHeadline when lottery number is between 68 and 84', () => {
      lotteryNumber = 84;
      const variant = 'orangeHeadline';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });

    it('should assign variant Control when lottery number is between 85 and 100', () => {
      lotteryNumber = 100;
      const variant = 'control';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });
  });
});

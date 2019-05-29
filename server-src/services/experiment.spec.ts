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

    it('should assign variant of redHeadline when lottery number is between 1 and 13', () => {
      lotteryNumber = 12;
      const variant = 'redHeadline';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });

    it('should assign variant of greenHeadline when lottery number is between 14 and 26', () => {
      lotteryNumber = 25;
      const variant = 'greenHeadline';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });

    it('should assign variant Control when lottery number is between 27 and 50', () => {
      lotteryNumber = 49;
      const variant = 'control';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });
  });

  describe('Toucan', () => {
    const experimentName = 'Toucan';

    it('should assign variant of purpleHeadline when lottery number is between 51 and 64', () => {
      lotteryNumber = 63;
      const variant = 'purpleHeadline';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });

    it('should assign variant of orangeHeadline when lottery number is between 65 and 76', () => {
      lotteryNumber = 75;
      const variant = 'orangeHeadline';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });

    it('should assign variant Control when lottery number is between 77 and 100', () => {
      lotteryNumber = 99;
      const variant = 'control';

      expect(getExperimentVariant(experimentName, lotteryNumber)).toEqual(
        variant
      );
    });
  });
});

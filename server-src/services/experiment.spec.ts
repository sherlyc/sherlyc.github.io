import { experimentService } from './experiment';

describe('Experiment service', () => {
  describe('during BackgroundColor experiment', () => {
    const experimentName = 'backgroundColor';

    it('should assign variant of YellowBackground when lottery number is between 0 and 49', () => {
      const lotteryNumber = 49;
      const variant = 'YellowBackground';

      expect(experimentService(experimentName, lotteryNumber)).toEqual(variant);
    });

    it('should assign variant Control when lottery number is between 50 and 99', () => {
      let lotteryNumber = 51;
      const variant = 'control';

      expect(experimentService(experimentName, lotteryNumber)).toEqual(variant);

      lotteryNumber = 99;
      expect(experimentService(experimentName, lotteryNumber)).toEqual(variant);
    });
  });


  describe('handles multiple experiments', () => {
    const experimentName = 'linkColor';
    it('should assign variant of PurpleLinkColor when lottery number is between 0 and 24', () => {
      const lotteryNumber = 24;
      const variant = 'PurpleLinkColor';

      expect(experimentService(experimentName, lotteryNumber)).toEqual(variant);
    });
  });


  it('should handle errors when provided with bad data', () => {
    let experimentName = '';
    let lotteryNumber = -1;

    expect(() => {
      experimentService(experimentName, lotteryNumber);
    }).toThrowError(
      `bad experiment data provided, name[${experimentName}], lotteryNumber[${lotteryNumber}]`
    );

    experimentName = 'afjdjafia';
    lotteryNumber = 8;

    expect(() => {
      experimentService(experimentName, lotteryNumber);
    }).toThrowError(
      `bad experiment data provided, name[${experimentName}], lotteryNumber[${lotteryNumber}]`
    );

    experimentName = 'backgroundColor';
    lotteryNumber = -8;

    expect(() => {
      experimentService(experimentName, lotteryNumber);
    }).toThrowError(
      `bad experiment data provided, name[${experimentName}], lotteryNumber[${lotteryNumber}]`
    );

  });


});

import { experimentService } from './experiment';

describe('Experiment service', () => {
  describe('during BackgroundColor experiment', () => {
    const experimentName = 'backgroundColor';

    it('should assign variant of YellowBackground when lottery number is less than 50', () => {
      const lotteryNumber = 30;
      const variant = 'YellowBackground';

      expect(experimentService(experimentName, lotteryNumber)).toEqual(variant);
    });

    it('should assign variant Control when lottery number is greater than 50', () => {
      const lotteryNumber = 51;
      const variant = 'control';

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

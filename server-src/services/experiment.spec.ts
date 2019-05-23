import { experimentService } from './experiment';

describe('Experiment service', () => {
  let experimentName = 'Parrot';

  it('should assign variant of redHeadline when lottery number is between 0 and 33', () => {
    const lotteryNumber = 33;
    const variant = 'redHeadline';

    expect(experimentService(experimentName, lotteryNumber)).toEqual(variant);
  });

  it('should assign variant of greenHeadline when lottery number is between 34 and 67', () => {
    const lotteryNumber = 67;
    const variant = 'greenHeadline';

    expect(experimentService(experimentName, lotteryNumber)).toEqual(variant);
  });

  it('should assign variant Control when lottery number is between 68 and 99', () => {
    let lotteryNumber = 68;
    const variant = 'control';

    expect(experimentService(experimentName, lotteryNumber)).toEqual(variant);

    lotteryNumber = 99;
    expect(experimentService(experimentName, lotteryNumber)).toEqual(variant);
  });

  it('should handle errors when provided with bad data', () => {
    experimentName = '';
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

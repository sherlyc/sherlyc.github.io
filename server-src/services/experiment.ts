import { IParams } from './__types__/IParams';
import { throwError } from 'rxjs';

export const experimentService = (
  name: string,
  lotteryNumber: number
): IExperimentVariant => {
  if (name && lotteryNumber) {
    switch (name) {
      case 'backgroundColor':
        if (lotteryNumber < 50) {
          return { variant: 'YellowBackground' } as IExperimentVariant;
        } else {
          return { variant: 'control' };
        }
        break;
      default:
        throw Error(
          `bad experiment data provided, name[${name}], lotteryNumber[${lotteryNumber}]`
        );
    }
  }
  throw Error(
    `bad experiment data provided, name[${name}], lotteryNumber[${lotteryNumber}]`
  );
};

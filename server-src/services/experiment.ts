import { IParams } from './__types__/IParams';

export const experimentService = async (
  name: string,
  lotteryNumber: number
): Promise<IExperimentVariant> => {
  if (name === 'backgroundColor') {
    if (lotteryNumber < 50) {
      return { variant: 'YellowBackground' } as IExperimentVariant;
    }
  }

  return { variant: 'control' };
};

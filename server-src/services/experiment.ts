import { IParams } from './__types__/IParams';

export const experimentService = async (
  name: string,
  lotteryNumber: number,
  params: IParams
): Promise<IExperimentVariant> => {
  if (name === 'backgroundColor') {
    if (lotteryNumber < 50) {
      return { variant: 'A' } as IExperimentVariant;
    }
  }

  return { variant: 'control' };
};

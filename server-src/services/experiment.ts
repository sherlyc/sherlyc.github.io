export const getExperimentVariant = (
  name: string,
  lotteryNumber: number
): string => {
  switch (name) {
    case 'Users':
      if (lotteryNumber >= 1 && lotteryNumber <= 50) {
        return 'Parrot';
      } else if (lotteryNumber >= 51 && lotteryNumber <= 100) {
        return 'Toucan';
      }
      return 'control';
    case 'Parrot':
      if (lotteryNumber >= 1 && lotteryNumber <= 33) {
        return 'redHeadline';
      } else if (lotteryNumber >= 34 && lotteryNumber <= 66) {
        return 'greenHeadline';
      } else {
        return 'control';
      }
    case 'Toucan':
      if (lotteryNumber >= 1 && lotteryNumber <= 33) {
        return 'purpleHeadline';
      } else if (lotteryNumber >= 34 && lotteryNumber <= 66) {
        return 'orangeHeadline';
      } else {
        return 'control';
      }
    default:
      return 'control';
  }
};

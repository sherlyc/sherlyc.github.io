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
      if (lotteryNumber >= 1 && lotteryNumber <= 13) {
        return 'redHeadline';
      } else if (lotteryNumber >= 14 && lotteryNumber <= 26) {
        return 'greenHeadline';
      } else {
        return 'control';
      }
    case 'Toucan':
      if (lotteryNumber >= 51 && lotteryNumber <= 64) {
        return 'purpleHeadline';
      } else if (lotteryNumber >= 65 && lotteryNumber <= 76) {
        return 'orangeHeadline';
      } else {
        return 'control';
      }
    default:
      return 'control';
  }
};

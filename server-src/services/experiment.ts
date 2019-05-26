export const getExperimentVariant = (
  name: string,
  lotteryNumber: number
): string => {
  switch (name) {
    case 'Users':
      if (lotteryNumber >= 50 && lotteryNumber <= 75) {
        return 'Parrot';
      } else if (lotteryNumber >= 76 && lotteryNumber <= 99) {
        return 'Toucan';
      } else {
        return 'control';
      }
    case 'Parrot':
      if (lotteryNumber <= 32) {
        return 'redHeadline';
      } else if (lotteryNumber >= 33 && lotteryNumber <= 66) {
        return 'greenHeadline';
      } else {
        return 'control';
      }
    case 'Toucan':
      if (lotteryNumber < 32) {
        return 'purpleHeadline';
      } else if (lotteryNumber >= 33 && lotteryNumber <= 66) {
        return 'orangeHeadline';
      } else {
        return 'control';
      }
    default:
      return 'control';
  }
};

function validateLottery(name: string, lotteryNumber: number) {
  if (!lotteryNumber || lotteryNumber > 100 || lotteryNumber < 0) {
    throwException(name, lotteryNumber);
  }
}

function throwException(name: string, lotteryNumber: number) {
  throw Error(
    `bad experiment data provided, name[${name}], lotteryNumber[${lotteryNumber}]`
  );
}

export const experimentService = (
  name: string,
  lotteryNumber: number
): string => {
  validateLottery(name, lotteryNumber);

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
      if (lotteryNumber < 34) {
        return 'redHeadline';
      } else if (lotteryNumber > 34 && lotteryNumber < 68) {
        return 'greenHeadline';
      } else {
        return 'control';
      }
      break;
    case 'Toucan':
      if (lotteryNumber < 34) {
        return 'purpleHeadline';
      } else if (lotteryNumber > 34 && lotteryNumber < 68) {
        return 'orangeHeadline';
      } else {
        return 'control';
      }
    default:
      throwException(name, lotteryNumber);
      return '';
  }
};

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
    case 'backgroundColor':
      if (lotteryNumber < 50) {
        return 'YellowBackground';
      } else {
        return 'control';
      }
      break;
    default:
      throwException(name, lotteryNumber);
      return '';
  }
};

function format(seconds: number) {
  if (seconds >= 7200 || seconds < 0) {
    // 2 hours
    return '';
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const hoursText = hours === 0 ? '' : `${hours} hour `;
  const minutesText = minutes === 0 ? '' : `${minutes} min `;
  return `${hoursText}${minutesText}ago`;
}

const formatters: { [key: string]: (seconds: number) => string } = {
  default: format
};

export default formatters;

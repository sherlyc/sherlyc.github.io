function format(seconds: number) {
  if (seconds >= 7200) {
    // 2 hours
    return '';
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const hoursText = hours === 0 ? '' : `${hours} hour `;
  return `${hoursText}${minutes} min ago`;
}

const formatters: { [key: string]: (diff: number) => string } = {
  default: format
};

export default formatters;

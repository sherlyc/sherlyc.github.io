import { differenceInSeconds, format, fromUnixTime } from "date-fns";

const ONE_HOUR_IN_SECONDS = 3600;
const ONE_MINUTE_IN_SECONDS = 60;

function timeAgoFormat(secondsAgo: number) {
  const hours = Math.floor(secondsAgo / ONE_HOUR_IN_SECONDS);
  const minutes = Math.floor(
    (secondsAgo % ONE_HOUR_IN_SECONDS) / ONE_MINUTE_IN_SECONDS
  );
  const hoursText = hours === 0 ? "" : `${hours} hour `;
  const minutesText = minutes === 0 ? "" : `${minutes} min `;
  const text = `${hoursText}${minutesText}`;
  return text ? `${hoursText}${minutesText}ago` : "";
}

export function formatTime(timestamp: number) {
  const inputDate = fromUnixTime(timestamp);
  const secondsAgo = differenceInSeconds(Date.now(), inputDate);

  if (secondsAgo > ONE_HOUR_IN_SECONDS * 2 || secondsAgo < 0) {
    return "";
  }
  if (
    secondsAgo >= ONE_HOUR_IN_SECONDS &&
    secondsAgo <= ONE_HOUR_IN_SECONDS * 2
  ) {
    return format(inputDate, "h:mma").toLowerCase();
  }
  return timeAgoFormat(secondsAgo);
}

export function timeColor(timestamp: number) {
  const inputDate = fromUnixTime(timestamp);
  const secondsAgo = differenceInSeconds(Date.now(), inputDate);
  if (secondsAgo > ONE_HOUR_IN_SECONDS * 2 || secondsAgo < 0) {
    return "";
  }
  if (
    secondsAgo >= ONE_HOUR_IN_SECONDS &&
    secondsAgo <= ONE_HOUR_IN_SECONDS * 2
  ) {
    return "#9f9f9f";
  }
  return "#ff433d";
}

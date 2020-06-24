import { getUnixTime, sub } from "date-fns";
import { formatTime, timeColor } from "./timestamp-helper";

const _Date = Date;

function fakeDate(defaultDate: string | number) {
  Object.defineProperty(global, "Date", {
    value: (arg: any) => new _Date(arg || defaultDate)
  });
  global.Date.now = () => new _Date(defaultDate).getTime();
}

describe("Timestamp Helper", () => {
  beforeAll(() => {
    fakeDate("2019-07-01");
  });

  afterAll(() => {
    global.Date = _Date;
  });

  it.each`
    minutesAgo | expected
    ${0.5}     | ${""}
    ${1}       | ${"1 min ago"}
    ${20}      | ${"20 min ago"}
    ${59}      | ${"59 min ago"}
  `(
    "should format time ago when it is between 1 to 59 minutes ago ($minutesAgo min ago)",
    ({ minutesAgo, expected }) => {
      const timestamp = getUnixTime(sub(new Date(), { minutes: minutesAgo }));
      expect(formatTime(timestamp)).toBe(expected);
    }
  );

  it.each`
    now                            | inputTime                      | expected
    ${"January 01, 2020 15:00:00"} | ${"January 01, 2020 14:00:00"} | ${"2:00pm"}
    ${"January 01, 2020 15:00:00"} | ${"January 01, 2020 13:32:00"} | ${"1:32pm"}
    ${"January 01, 2020 15:00:00"} | ${"January 01, 2020 13:00:00"} | ${"1:00pm"}
    ${"January 01, 2020 02:00:00"} | ${"January 01, 2020 00:00:00"} | ${"12:00am"}
    ${"January 01, 2020 11:00:00"} | ${"January 01, 2020 9:00:00"}  | ${"9:00am"}
  `(
    "should format time in 12 hour clock format when it is between 1 and 2 hours ago ($expected)",
    ({ now, inputTime, expected }) => {
      fakeDate(now);

      const timestamp = getUnixTime(new Date(inputTime));

      expect(formatTime(timestamp)).toBe(expected);
    }
  );

  it.each(["January 01, 2020 09:00:00", "January 01, 2020 13:00:00"])(
    "should not show time when it is more than 2 hours ago or in the future (%s)",
    (inputTime) => {
      const fakeNow = "January 01, 2020 12:00:00";
      fakeDate(fakeNow);
      const timestamp = getUnixTime(new Date(inputTime));

      expect(formatTime(timestamp)).toBeFalsy();
    }
  );

  it.each`
    minutesAgo | expectedColor
    ${0.5}     | ${"#ff433d"}
    ${1}       | ${"#ff433d"}
    ${20}      | ${"#ff433d"}
    ${59}      | ${"#ff433d"}
    ${60}      | ${"#9f9f9f"}
    ${90}      | ${"#9f9f9f"}
    ${120}     | ${"#9f9f9f"}
    ${150}     | ${""}
    ${180}     | ${""}
  `(
    "should get time color $expectedColor ($minutesAgo min ago)",
    ({ minutesAgo, expectedColor }) => {
      const timestamp = getUnixTime(sub(new Date(), { minutes: minutesAgo }));
      expect(timeColor(timestamp)).toBe(expectedColor);
    }
  );
});

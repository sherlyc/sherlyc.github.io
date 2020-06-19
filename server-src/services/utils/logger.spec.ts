import { TransformableInfo } from "logform";
import { formatAlarmHours, formatStackTrace } from "./logger";

describe("Logger", () => {
  describe("formatStackTrace", () => {
    it("should not format when there is no error", () => {
      const info: TransformableInfo = {
        error: undefined,
        level: "error",
        message: "message"
      };

      const result = formatStackTrace().transform(info);

      expect(result).toEqual(info);
    });

    it("should format when there is an error", () => {
      const error = new Error();
      error.stack = "Things be messed up yo";
      const info: TransformableInfo = {
        error,
        level: "error",
        message: "message"
      };

      const result = formatStackTrace().transform(info);

      expect(result).toEqual({
        ...info,
        trace: "Things be messed up yo"
      });
    });
  });

  describe("formatAlarmHours", () => {
    it.each`
      time          | alarmHours
      ${"06:59:59"} | ${false}
      ${"07:00:00"} | ${true}
      ${"17:59:59"} | ${true}
      ${"18:00:00"} | ${false}
    `(
      "tags error logs as alarmHours: $alarmHours on $time",
      ({ time, alarmHours }) => {
        const timestamp = new Date(`2020-03-31T${time}+12:00`).toISOString();
        const info: TransformableInfo = {
          level: "error",
          message: "message",
          timestamp
        };
        expect(formatAlarmHours().transform(info)).toEqual({
          ...info,
          alarmHours
        });
      }
    );

    it.each`
      level
      ${"info"}
      ${"debug"}
      ${"warn"}
    `("does not tag $level logs", ({ level }) => {
      const info: TransformableInfo = {
        level,
        message: "message"
      };
      expect(formatAlarmHours().transform(info)).toEqual(info);
    });
  });
});

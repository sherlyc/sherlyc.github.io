import { TransformableInfo } from "logform";
import { formatStackTrace, formatWorkHours } from "./logger";

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

  describe("formatWorkHours", () => {
    it.each`
      time          | workHours
      ${"06:59:59"} | ${false}
      ${"07:00:00"} | ${true}
      ${"22:59:59"} | ${true}
      ${"23:00:00"} | ${false}
    `(
      "tags error logs as workHours: $workHours on $time",
      ({ time, workHours }) => {
        const timestamp = new Date(`2020-03-31T${time}+12:00`).toISOString();
        const info: TransformableInfo = {
          level: "error",
          message: "message",
          timestamp
        };
        expect(formatWorkHours().transform(info)).toEqual({
          ...info,
          workHours
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
      expect(formatWorkHours().transform(info)).toEqual(info);
    });
  });
});

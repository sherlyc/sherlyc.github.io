import { TransformableInfo } from "logform";
import { formatStackTrace } from "./logger";

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
});

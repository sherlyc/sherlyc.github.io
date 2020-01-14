import { TransformableInfo } from "logform";
import { formatStackTrace } from "./logger";

describe("Logger", () => {
  it("should not format when there is no error", () => {
    const info: TransformableInfo = {
      error: undefined,
      level: "error",
      message: "message"
    };

    const result = formatStackTrace(info);

    expect(result).toEqual(info);
  });

  it("should format when there is an error", () => {
    const error = new Error();
    error.stack = "Things be messed up yo";
    const info: TransformableInfo = {
      error: error,
      level: "error",
      message: "message"
    };

    const result = formatStackTrace(info);

    expect(result).toEqual({
      ...info,
      trace: "Things be messed up yo"
    });
  });

  it("should remove line breaks in stack trace", () => {
    const error = new Error();
    error.stack = "Everything\n is\n on  fire";
    const info: TransformableInfo = {
      error: error,
      level: "error",
      message: "message"
    };

    const result = formatStackTrace(info);

    expect(result.trace).toEqual("Everything is on  fire");
  });
});

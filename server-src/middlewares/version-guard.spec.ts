import { versionGuard } from "./version-guard";

describe("version guard", () => {
  const ENV = process.env;

  const next = jest.fn();
  const end = jest.fn();
  let res: any;
  let req: any;

  beforeEach(() => {
    jest.resetAllMocks();

    res = {
      status: jest.fn(() => ({ end }))
    };

    req = {
      params: {
        version: "SNAPSHOT"
      }
    };
  });

  afterEach(() => {
    process.env = ENV;
  });

  it.each(["1.300", "1.600", "1.700", "1.750", "SNAPSHOT"])(
    `[ apiVersion = 1.700 | frontEndVersion %s ] is valid (>= 1.300, <= apiVersion + 0.50 or SNAPSHOT)`,
    (frontEndVersion) => {
      process.env.SPADE_VERSION = "1.700";
      req.params.version = frontEndVersion;

      versionGuard(req, res, next);

      expect(next).toHaveBeenCalled();
    }
  );

  it.each(["1.299", "1.751", "randomgibberish"])(
    `[ apiVersion = 1.700 | frontEndVersion %s ] is not valid (< 1.300, > apiVersion + 0.50 or not a version)`,
    async (frontEndVersion) => {
      process.env.SPADE_VERSION = "1.700";
      req.params.version = frontEndVersion;

      versionGuard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(end).toHaveBeenCalled();
    }
  );

  it("skips checking if BE version is undefined", async () => {
    delete process.env.SPADE_VERSION;

    versionGuard(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

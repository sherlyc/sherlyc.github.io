import { Request, Response } from "express";
import { DeviceType } from "../../common/DeviceType";
import { ExperimentName } from "../../common/ExperimentName";
import { getExperimentVariant } from "../services/adapters/experiment/experiment";
import { experimentController } from "./experiment-controller";

jest.mock("../services/adapters/experiment/experiment");

describe("Experiment controller", () => {
  const req = ({
    spadeParams: { apiRequestId: "33498" },
    params: { experimentName: "", lotteryNumber: "1", deviceType: "unknown" },
    cookies: {}
  } as any) as Request;
  const res = { send: jest.fn(), status: jest.fn(), end: jest.fn() } as any;

  beforeEach(() => {
    jest.resetAllMocks();
    res.status.mockReturnValue(res);
  });

  it("should respond with variant", async () => {
    req.params.experimentName = ExperimentName.Users;
    req.params.lotteryNumber = "27";
    const variant = "Variant A";
    (getExperimentVariant as jest.Mock).mockReturnValue(variant);

    await experimentController(req, res);

    expect(res.send).toHaveBeenCalledWith(variant);
  });

  it("should respond with control variant when experiment does not exist", async () => {
    (ExperimentName as any).Random = "Random";

    req.params.experimentName = "Random";
    req.params.lotteryNumber = "27";
    const variant = "control";
    (getExperimentVariant as jest.Mock).mockReturnValue(variant);

    await experimentController(req, res);

    expect(res.send).toHaveBeenCalledWith(variant);
  });

  it("should pass experimentName, lotteryNumber, deviceType and spadeParams to getExperimentVariant function", async () => {
    req.params.experimentName = "Random";
    req.params.lotteryNumber = "27";
    req.params.deviceType = "mobile";

    await experimentController(req, res);

    expect(getExperimentVariant).toHaveBeenCalledWith(
      "Random",
      27,
      "mobile",
      req.spadeParams
    );
  });

  it("should return 400 and message in body when lottery number is not a number", async () => {
    req.params.experimentName = ExperimentName.Users;
    req.params.lotteryNumber = "%#@#$";
    req.params.deviceType = DeviceType.tablet;

    await experimentController(req, res);

    assert400StatusAndMessage(res, req);
  });

  it("should return 400 and message in body when provided with lottery number less than or equal to zero", async () => {
    req.params.experimentName = ExperimentName.Users;
    req.params.lotteryNumber = "0";
    req.params.deviceType = DeviceType.tablet;

    await experimentController(req, res);

    assert400StatusAndMessage(res, req);
  });

  it("should return 400 and message in body when provided with invalid deviceType", async () => {
    req.params.experimentName = ExperimentName.Users;
    req.params.lotteryNumber = "27";
    req.params.deviceType = "asdfasdf";

    await experimentController(req, res);

    assert400StatusAndMessage(res, req);
  });

  it("should return 400 and message in body when provided deviceType is not provided", async () => {
    req.params.experimentName = ExperimentName.Users;
    req.params.lotteryNumber = "27";
    req.params.deviceType = "";

    await experimentController(req, res);

    assert400StatusAndMessage(res, req);
  });
});

function assert400StatusAndMessage(res: Response, req: Request) {
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.status).toHaveBeenCalledTimes(1);

  expect(res.send).toHaveBeenCalledWith(`Invalid experiment data provided,
     name [${req.params.experimentName}], lotteryNumber [${req.params.lotteryNumber}], deviceType [${req.params.deviceType}]`);
  expect(res.send).toHaveBeenCalledTimes(1);
}

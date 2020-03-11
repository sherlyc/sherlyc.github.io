import { getExperimentVariant } from "./experiment";
import { DeviceType } from "../../../../common/DeviceType";
import { IParams } from "../../__types__/IParams";
import { ExperimentName } from "../../../../common/ExperimentName";

jest.mock("../../utils/cache-http");

describe("Experiment service", () => {
  const params: IParams = { apiRequestId: "123123" };

  it("should return control if experiment is not in the config", async () => {
    const experimentVariant = await getExperimentVariant(
      "NotAnExperiment" as ExperimentName,
      50,
      DeviceType.mobile,
      params
    );

    expect(experimentVariant).toBe("control");
  });

  describe("Users", () => {
    it("should return control for Users", async () => {
      const experimentVariant = await getExperimentVariant(
        ExperimentName.Users,
        1,
        DeviceType.unknown,
        params
      );

      expect(experimentVariant).toBe("control");
    });
  });
});

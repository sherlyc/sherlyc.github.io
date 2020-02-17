import { getMostPopular } from "./most-popular.service";
import { IParams } from "../../__types__/IParams";
import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";

jest.mock("../../utils/cache-http");

describe("Most popular service", function() {
  const params: IParams = {
    apiRequestId: "1"
  };

  it("should get articles from most popular service", async () => {
    const limit = 10;
    await getMostPopular(limit, params);

    expect(cacheHttp).toHaveBeenCalledWith(
      params,
      `${config.mostPopularApi}?limit=${limit}`
    );
  });
});

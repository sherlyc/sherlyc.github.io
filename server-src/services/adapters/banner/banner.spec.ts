import getBanner from "./banner";
import cacheHttp from "../../utils/cache-http";
import { IParams } from "../../__types__/IParams";

jest.mock("../../utils/config");
jest.mock("../../utils/cache-http");

describe("Banner service", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  beforeAll(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it("should get banner", async () => {
    const bannerData = [
      {
        startDateTimeUTC: "2019-08-01T00:00:00",
        endDateTimeUTC: "2019-09-08T16:59:59",
        banner: {
          height: "65px",
          url: "https://uber1.html"
        }
      },
      {
        startDateTimeUTC: "2019-09-08T17:00:00",
        endDateTimeUTC: "2019-09-15T11:00:00",
        banner: {
          height: "50px",
          url: "https://uber2.html"
        }
      }
    ];
    (cacheHttp as jest.Mock).mockResolvedValue({
      data: bannerData
    });
    expect(await getBanner(params)).toEqual(bannerData);
  });

  it("should not get banner when api request fails", async () => {
    const error = new Error("AJAX error");
    (cacheHttp as jest.Mock).mockRejectedValue(error);
    await expect(getBanner(params)).rejects.toEqual(error);
  });
});

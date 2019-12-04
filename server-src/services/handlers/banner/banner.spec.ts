import getBanner from "../../adapters/banner/banner";
import { IBannerResponse } from "../../adapters/__types__/IBannerResponse";
import bannerHandler from "./banner";
import { IParams } from "../../__types__/IParams";
import logger from "../../utils/logger";
import { IBannerHandlerInput } from "../__types__/IBannerHandlerInput";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IExternalContentUnit } from "../../../../common/__types__/IExternalContentUnit";
import { HandlerInputType } from "../__types__/HandlerInputType";

jest.mock("../../adapters/banner/banner");
const OriginalNow = global.Date.now;

describe("BannerHandler", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  const bannerOne = {
    startDateTimeUTC: "2019-08-01T00:00:00",
    endDateTimeUTC: "2019-09-08T16:59:59",
    banner: {
      height: "65px",
      url: "https://uber1.html"
    }
  };
  const bannerTwo = {
    startDateTimeUTC: "2019-09-08T17:00:00",
    endDateTimeUTC: "2019-09-15T11:00:00",
    banner: {
      height: "50px",
      url: "https://uber2.html"
    }
  };
  const withinBannerOneDateRange = "2019-09-08T16:59:59+00:00";
  const outsideOfAnyDateRange = "2019-09-15T11:00:01+00:00";
  const defaultExternalContentBlock: Partial<IExternalContentUnit> = {
    type: ContentBlockType.ExternalContentUnit,
    height: "50px",
    width: "100%",
    margin: "0 0 10px 0"
  };

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    global.Date.now = OriginalNow;
  });

  it("should get currently active banner based on current time", async () => {
    const handlerRunnerMock = jest.fn();
    const bannerResponse: IBannerResponse[] = [bannerOne, bannerTwo];
    (global as any).Date.now = () =>
      new Date(withinBannerOneDateRange).getTime();
    (getBanner as jest.Mock).mockResolvedValue(bannerResponse);
    handlerRunnerMock.mockResolvedValue([
      {
        ...defaultExternalContentBlock,
        url: bannerOne.banner.url,
        height: bannerOne.banner.height
      }
    ]);

    const contentBlocks = await bannerHandler(
      handlerRunnerMock,
      {} as IBannerHandlerInput,
      params
    );

    expect(contentBlocks).toHaveLength(1);
    expect(contentBlocks[0]).toEqual({
      type: ContentBlockType.ExternalContentUnit,
      height: bannerOne.banner.height,
      url: bannerOne.banner.url,
      margin: "0 0 10px 0",
      width: "100%"
    });
  });

  it("should delegate creation of ExternalContentUnit", async () => {
    const handlerRunnerMock = jest.fn();
    const bannerResponse: IBannerResponse[] = [bannerOne];
    (global as any).Date.now = () =>
      new Date(withinBannerOneDateRange).getTime();
    (getBanner as jest.Mock).mockResolvedValue(bannerResponse);

    const externalContentBlocks = [
      {
        ...defaultExternalContentBlock,
        url: bannerOne.banner.url,
        height: bannerOne.banner.height
      }
    ];
    handlerRunnerMock.mockResolvedValue(externalContentBlocks);

    await bannerHandler(handlerRunnerMock, {} as IBannerHandlerInput, params);

    expect(handlerRunnerMock).toHaveBeenCalledTimes(1);
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      {
        type: HandlerInputType.ExternalContent,
        width: "100%",
        margin: "0 0 10px 0",
        height: bannerOne.banner.height,
        url: bannerOne.banner.url
      },
      params
    );
  });

  it("should return an empty content block when there is no active banner", async () => {
    const handlerRunnerMock = jest.fn();
    const bannerResponse: IBannerResponse[] = [bannerOne, bannerTwo];
    (global as any).Date.now = () => new Date(outsideOfAnyDateRange).getTime();
    (getBanner as jest.Mock).mockResolvedValue(bannerResponse);

    const contentBlocks = await bannerHandler(
      handlerRunnerMock,
      {} as IBannerHandlerInput,
      params
    );

    expect(contentBlocks).toHaveLength(0);
  });

  it("should get an empty content block list and log error when banner api fails", async () => {
    const handlerRunnerMock = jest.fn();
    const error = new Error();
    const loggerSpy = jest.spyOn(logger, "error");
    (getBanner as jest.Mock).mockRejectedValue(error);

    const contentBlocks = await bannerHandler(
      handlerRunnerMock,
      {} as IBannerHandlerInput,
      params
    );

    expect(contentBlocks).toHaveLength(0);
    expect(loggerSpy).toHaveBeenCalled();
  });
});

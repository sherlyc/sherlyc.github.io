import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { gridBlockErrorHandler } from "./grid-block-error-handler";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { isFeatureEnabled } from "../../adapters/feature/feature";
import wrappedLogger from "../../utils/logger";
import { FeatureName } from "../../../../common/FeatureName";
import { DeviceType } from "../../../../common/DeviceType";

jest.mock("../../adapters/feature/feature");
jest.mock("../../utils/logger");

describe("Grid block error handler", () => {
  const params = { apiRequestId: "1" };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return contentConverterCallback result", async () => {
    const mockConverterCallback = jest.fn();
    const fakeContentBlock: IBasicArticleTitleUnit = {
      type: ContentBlockType.BasicArticleTitleUnit,
      id: "2",
      strapName: "strapName",
      indexHeadline: "Headline 2",
      title: "Title Two",
      linkUrl: "/link2",
      lastPublishedTime: 2,
      headlineFlags: []
    };
    mockConverterCallback.mockResolvedValue(fakeContentBlock);

    const result = await gridBlockErrorHandler(
      mockConverterCallback,
      HandlerInputType.NewsSix,
      params
    );

    expect(result).toEqual(fakeContentBlock);
  });

  it("should log info if callback fails and module layout feature has not been rolled out", async () => {
    const mockConverterCallback = jest.fn();
    const error = new Error("Failed");
    mockConverterCallback.mockRejectedValue(error);
    (isFeatureEnabled as jest.Mock).mockResolvedValue(false);

    const result = await gridBlockErrorHandler(
      mockConverterCallback,
      HandlerInputType.NewsSix,
      params
    );

    expect(wrappedLogger.info).toHaveBeenCalledWith(
      params.apiRequestId,
      `${HandlerInputType.NewsSix} - Potentially insufficient articles for position`,
      error
    );
    expect(result).toEqual(undefined);
  });

  it("should log error and return empty array if callback fails and module layout feature has been rolled out", async () => {
    const mockConverterCallback = jest.fn();
    const error = new Error("Failed");
    mockConverterCallback.mockRejectedValue(error);
    (isFeatureEnabled as jest.Mock).mockResolvedValue(true);

    const result = await gridBlockErrorHandler(
      mockConverterCallback,
      HandlerInputType.NewsSix,
      params
    );

    expect(wrappedLogger.error).toHaveBeenCalledWith(
      params.apiRequestId,
      `${HandlerInputType.NewsSix} - Potentially insufficient articles for position`,
      error
    );
    expect(result).toEqual(undefined);
  });

  it("should call isFeatureEnabled with correct params if callback fails", async () => {
    const mockConverterCallback = jest.fn();
    const error = new Error("Failed");
    mockConverterCallback.mockRejectedValue(error);
    (isFeatureEnabled as jest.Mock).mockResolvedValue(false);

    await gridBlockErrorHandler(
      mockConverterCallback,
      HandlerInputType.NewsSix,
      params
    );

    expect(isFeatureEnabled).toHaveBeenCalledWith(
      FeatureName.ModuleLayout,
      1,
      DeviceType.unknown
    );
  });
});

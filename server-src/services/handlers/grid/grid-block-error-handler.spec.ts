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
      "Top",
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
      "Top",
      params
    );

    expect(wrappedLogger.info).toHaveBeenCalledWith(
      params.apiRequestId,
      `${HandlerInputType.NewsSix} - Potentially insufficient articles for position Top`,
      error
    );
    expect(result).toEqual([]);
  });

  it("should log and throw error if callback fails and module layout feature has been rolled out", async () => {
    const mockConverterCallback = jest.fn();
    const error = new Error("Failed");
    mockConverterCallback.mockRejectedValue(error);
    (isFeatureEnabled as jest.Mock).mockResolvedValue(true);

    expect.assertions(1);
    try {
      await gridBlockErrorHandler(
        mockConverterCallback,
        HandlerInputType.NewsSix,
        "Top",
        params
      );
    } catch (error) {
      expect(error.message).toContain(
        `${HandlerInputType.NewsSix} - Potentially insufficient articles for position Top`
      );
    }
  });

  it("should call isFeatureEnabled with correct params if callback fails", async () => {
    const mockConverterCallback = jest.fn();
    const error = new Error("Failed");
    mockConverterCallback.mockRejectedValue(error);
    (isFeatureEnabled as jest.Mock).mockResolvedValue(false);

    await gridBlockErrorHandler(
      mockConverterCallback,
      HandlerInputType.NewsSix,
      "Top",
      params
    );

    expect(isFeatureEnabled).toHaveBeenCalledWith(
      FeatureName.ModuleLayout,
      1,
      DeviceType.unknown
    );
  });
});

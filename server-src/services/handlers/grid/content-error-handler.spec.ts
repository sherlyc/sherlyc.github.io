import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";
import { Strap } from "../../strap";
import wrappedLogger from "../../utils/logger";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { contentErrorHandler } from "./content-error-handler";

jest.mock("../../adapters/feature/feature");
jest.mock("../../utils/logger");

describe("Content error handler", () => {
  const params = { apiRequestId: "1" };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return contentConverterCallback result", () => {
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
    mockConverterCallback.mockReturnValue(fakeContentBlock);

    const result = contentErrorHandler(
      mockConverterCallback,
      HandlerInputType.NewsSix,
      Strap.Business,
      params
    );

    expect(result).toEqual(fakeContentBlock);
  });

  it("should log warning if callback fails", () => {
    const mockConverterCallback = jest.fn();
    const error = new Error("Failed");
    mockConverterCallback.mockImplementation(() => {
      throw error;
    });

    contentErrorHandler(
      mockConverterCallback,
      HandlerInputType.NewsSix,
      Strap.Business,
      params
    );

    expect(wrappedLogger.warn).toHaveBeenCalledWith(
      params.apiRequestId,
      `${HandlerInputType.NewsSix} - Potentially insufficient articles for source ${Strap.Business}`,
      error
    );
  });
});

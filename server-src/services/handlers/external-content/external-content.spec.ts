import externalContentHandler from "./external-content";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IExternalContentUnit } from "../../../../common/__types__/IExternalContentUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import cacheHttp from "../../utils/cache-http";
import wrappedLogger from "../../utils/logger";

jest.mock("../../utils/cache-http");
jest.mock("../../utils/logger");

describe("ExternalContentHandler", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  const goodData = {};

  beforeAll(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it("should return ExternalContentUnit", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: goodData
    });
    const handlerRunnerMock = jest.fn();
    const externalContent = (await externalContentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ExternalContent,
        width: "100%",
        height: "300px",
        url: "https://example.com",
        margin: "10px"
      },
      params
    )) as IExternalContentUnit[];

    const expectedResult: IContentBlock[] = [
      {
        type: ContentBlockType.ExternalContentUnit,
        width: "100%",
        height: "300px",
        url: "https://example.com",
        margin: "10px"
      } as IExternalContentUnit
    ];

    expect(externalContent).toEqual(expectedResult);
  });

  it("should handle scrolling", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: goodData
    });
    const handlerRunnerMock = jest.fn();
    const externalContent = (await externalContentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ExternalContent,
        width: "100%",
        height: "300px",
        margin: "10px",
        scrollable: true,
        url: "https://example.com"
      },
      params
    )) as IExternalContentUnit[];

    const expectedResult: IContentBlock[] = [
      {
        type: ContentBlockType.ExternalContentUnit,
        width: "100%",
        height: "300px",
        margin: "10px",
        scrollable: true,
        url: "https://example.com"
      } as IExternalContentUnit
    ];

    expect(externalContent).toEqual(expectedResult);
  });

  it("should return empty and log warning with url when failing to retrieve content", async () => {
    const url = "https://bbc.com";

    (cacheHttp as jest.Mock).mockRejectedValue(new Error());
    const handlerRunnerMock = jest.fn();

    const externalContent = (await externalContentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ExternalContent,
        width: "100%",
        height: "300px",
        margin: "10px",
        scrollable: true,
        url
      },
      params
    )) as IExternalContentUnit[];

    expect(externalContent).toEqual([]);
    expect(wrappedLogger.warn).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.stringContaining(url)
    );
  });
});

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
        url: "https://example.com",
        mobile: {
          height: "320px",
          width: "100%",
          margin: "10px"
        },
        tablet: {
          height: "200px",
          width: "100%",
          margin: "15px"
        },
        desktop: {
          height: "200px",
          width: "100%",
          margin: "20px",
          scrollable: true
        }
      },
      params
    )) as IExternalContentUnit[];

    const expectedResult: IContentBlock[] = [
      {
        type: ContentBlockType.ExternalContentUnit,
        url: "https://example.com",
        mobile: {
          height: "320px",
          width: "100%",
          margin: "10px"
        },
        tablet: {
          height: "200px",
          width: "100%",
          margin: "15px"
        },
        desktop: {
          height: "200px",
          width: "100%",
          margin: "20px",
          scrollable: true
        }
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
        url: "https://example.com",
        mobile: {
          width: "100%",
          height: "300px",
          margin: "10px",
          scrollable: true
        }
      },
      params
    )) as IExternalContentUnit[];

    const expectedResult: IContentBlock[] = [
      {
        type: ContentBlockType.ExternalContentUnit,
        url: "https://example.com",
        mobile: {
          width: "100%",
          height: "300px",
          margin: "10px",
          scrollable: true
        }
      } as IExternalContentUnit
    ];

    expect(externalContent).toEqual(expectedResult);
  });

  it("should return empty and log warning with url when failing to retrieve content", async () => {
    const url = "https://bbc.com";
    const error = new Error();
    (cacheHttp as jest.Mock).mockRejectedValue(error);
    const handlerRunnerMock = jest.fn();

    const externalContent = (await externalContentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ExternalContent,
        url,
        mobile: {
          height: "300px",
          width: "100%",
          margin: "10px",
          scrollable: true
        }
      },
      params
    )) as IExternalContentUnit[];

    expect(externalContent).toEqual([]);
    expect(wrappedLogger.warn).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.stringContaining(url),
      error
    );
  });
});

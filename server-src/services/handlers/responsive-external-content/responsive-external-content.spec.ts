import responsiveExternalContent from "./responsive-external-content";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import cacheHttp from "../../utils/cache-http";
import wrappedLogger from "../../utils/logger";
import { IResponsiveExternalContent } from "../../../../common/__types__/IResponsiveExternalContent";
import { IResponsiveExternalContentHandlerInput } from "../__types__/IResponsiveExternalContentHandlerInput";

jest.mock("../../utils/cache-http");
jest.mock("../../utils/logger");

describe("Responsive External Content Handler", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  const goodData = {};

  beforeAll(() => {
    (cacheHttp as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it("should return ResponsiveExternalContentUnit", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: goodData
    });
    const handlerRunnerMock = jest.fn();
    const externalContent = (await responsiveExternalContent(
      handlerRunnerMock,
      {
        type: HandlerInputType.ResponsiveExternalContent,
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
          margin: "20px"
        }
      } as IResponsiveExternalContentHandlerInput,
      params
    )) as IResponsiveExternalContent[];

    const expectedResult: IContentBlock[] = [
      {
        type: ContentBlockType.ResponsiveExternalContent,
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
          margin: "20px"
        }
      } as IResponsiveExternalContent
    ];

    expect(externalContent).toEqual(expectedResult);
  });

  it("should handle scrolling", async () => {
    (cacheHttp as jest.Mock).mockResolvedValue({
      status: 200,
      data: goodData
    });
    const handlerRunnerMock = jest.fn();
    const externalContent = (await responsiveExternalContent(
      handlerRunnerMock,
      {
        type: HandlerInputType.ResponsiveExternalContent,
        url: "https://example.com",
        scrollable: true,
        mobile: {
          width: "100%",
          height: "300px",
          margin: "10px"
        }
      } as IResponsiveExternalContentHandlerInput,
      params
    )) as IResponsiveExternalContent[];

    const expectedResult: IContentBlock[] = [
      {
        type: ContentBlockType.ResponsiveExternalContent,
        url: "https://example.com",
        scrollable: true,
        mobile: {
          width: "100%",
          height: "300px",
          margin: "10px"
        }
      } as IResponsiveExternalContent
    ];

    expect(externalContent).toEqual(expectedResult);
  });

  it("should return empty and log warning with url when failing to retrieve content", async () => {
    const url = "https://bbc.com";
    const error = new Error();
    (cacheHttp as jest.Mock).mockRejectedValue(error);
    const handlerRunnerMock = jest.fn();

    const externalContent = (await responsiveExternalContent(
      handlerRunnerMock,
      {
        type: HandlerInputType.ResponsiveExternalContent,
        url,
        scrollable: true,
        mobile: {
          height: "300px",
          width: "100%",
          margin: "10px"
        }
      } as IResponsiveExternalContentHandlerInput,
      params
    )) as IResponsiveExternalContent[];

    expect(externalContent).toEqual([]);
    expect(wrappedLogger.warn).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.stringContaining(url),
      error
    );
  });
});

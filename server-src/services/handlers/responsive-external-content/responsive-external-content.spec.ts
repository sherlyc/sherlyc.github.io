import responsiveExternalContent from "./responsive-external-content";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import http from "../../utils/http";
import wrappedLogger from "../../utils/logger";
import { IResponsiveExternalContent } from "../../../../common/__types__/IResponsiveExternalContent";
import { IResponsiveExternalContentHandlerInput } from "../__types__/IResponsiveExternalContentHandlerInput";

jest.mock("../../utils/http");
jest.mock("../../utils/logger");

describe("Responsive External Content Handler", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  const goodData = {};
  const defaultHandlerInput = {
    type: HandlerInputType.ResponsiveExternalContent,
    url: "https://example.com",
    mobile: {
      width: "100%",
      height: "300px",
      margin: "10px"
    }
  };

  const httpGetMock = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    (http as jest.Mock).mockReturnValue({ get: httpGetMock });
  });

  it("should return ResponsiveExternalContentUnit", async () => {
    (httpGetMock as jest.Mock).mockResolvedValueOnce({
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
    (httpGetMock as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: goodData
    });
    const handlerRunnerMock = jest.fn();
    const externalContent = (await responsiveExternalContent(
      handlerRunnerMock,
      {
        ...defaultHandlerInput,
        scrollable: true
      } as IResponsiveExternalContentHandlerInput,
      params
    )) as IResponsiveExternalContent[];

    const expectedResult: IContentBlock[] = [
      expect.objectContaining({
        type: ContentBlockType.ResponsiveExternalContent,
        scrollable: true
      })
    ];

    expect(externalContent).toEqual(expectedResult);
  });

  it("should handle lazyLoad", async () => {
    (httpGetMock as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: goodData
    });
    const handlerRunnerMock = jest.fn();
    const externalContent = (await responsiveExternalContent(
      handlerRunnerMock,
      {
        ...defaultHandlerInput,
        lazyLoad: true
      } as IResponsiveExternalContentHandlerInput,
      params
    )) as IResponsiveExternalContent[];

    const expectedResult: IContentBlock[] = [
      expect.objectContaining({
        type: ContentBlockType.ResponsiveExternalContent,
        lazyLoad: true
      })
    ];

    expect(externalContent).toEqual(expectedResult);
  });

  it("should return empty and log warning with url when failing to retrieve content", async () => {
    const url = "https://bbc.com";
    const error = new Error();
    (httpGetMock as jest.Mock).mockRejectedValueOnce(error);
    const handlerRunnerMock = jest.fn();

    const externalContent = (await responsiveExternalContent(
      handlerRunnerMock,
      {
        ...defaultHandlerInput,
        url
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

  it("should append cache bust as query string", async () => {
    (httpGetMock as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: goodData
    });
    const handlerRunnerMock = jest.fn();
    await responsiveExternalContent(
      handlerRunnerMock,
      defaultHandlerInput as IResponsiveExternalContentHandlerInput,
      params
    );

    expect(httpGetMock).toHaveBeenCalledWith(defaultHandlerInput.url, {
      params: { "cache-bust": expect.any(String) }
    });
  });
});

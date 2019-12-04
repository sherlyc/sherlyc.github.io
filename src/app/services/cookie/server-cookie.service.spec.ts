import { TestBed } from "@angular/core/testing";

import { ServerCookieService } from "./server-cookie.service";
import { REQUEST, RESPONSE } from "@nguniversal/express-engine/tokens";

describe("ServerCookieService", () => {
  let cookieService: ServerCookieService;
  const requestMock = {
    headers: {
      cookie: ""
    }
  };

  const responseMock = {
    cookie: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServerCookieService,
        {
          provide: REQUEST,
          useFactory: () => requestMock
        },
        {
          provide: RESPONSE,
          useFactory: () => responseMock
        }
      ]
    });
    cookieService = TestBed.get(ServerCookieService);
    requestMock.headers.cookie = "";
    responseMock.cookie.mockReset();
  });

  it("should be created", () => {
    expect(cookieService).toBeTruthy();
  });

  it("should get cookie value", () => {
    requestMock.headers.cookie = "cookie-name=cookie-value";
    const cookieValue = cookieService.get("cookie-name");
    expect(cookieValue).toEqual("cookie-value");
  });

  it("should get all cookies", () => {
    requestMock.headers.cookie =
      "cookie-name1=cookie-value1; cookie-name2=cookie-value2";
    const cookies = cookieService.getAll();
    expect(cookies).toEqual({
      "cookie-name1": "cookie-value1",
      "cookie-name2": "cookie-value2"
    });
  });

  it("should set a cookie", () => {
    cookieService.set("cookie-name", "cookie-value", {
      secure: true
    });
    expect(responseMock.cookie).toHaveBeenCalledWith(
      "cookie-name",
      "cookie-value",
      {
        secure: true
      }
    );
  });
});

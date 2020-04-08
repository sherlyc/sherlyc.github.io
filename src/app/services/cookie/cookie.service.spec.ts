import { DOCUMENT } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { ServiceMock } from "../mocks/MockService";

import { CookieService } from "./cookie.service";

describe("CookieService", () => {
  let cookieService: ServiceMock<CookieService>;
  const documentMock = {
    cookie: ""
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DOCUMENT,
          useFactory: () => documentMock
        }
      ]
    });
    cookieService = TestBed.inject(CookieService) as ServiceMock<CookieService>;
    documentMock.cookie = "";
  });

  it("should be created", () => {
    expect(cookieService).toBeTruthy();
  });

  it("should get cookie value", () => {
    documentMock.cookie = "cookie-name=cookie-value";
    const cookieValue = cookieService.get("cookie-name");
    expect(cookieValue).toEqual("cookie-value");
  });

  it("should get all cookies", () => {
    documentMock.cookie =
      "cookie-name1=cookie-value1; cookie-name2=cookie-value2";
    const cookies = cookieService.getAll();
    expect(cookies).toEqual({
      "cookie-name1": "cookie-value1",
      "cookie-name2": "cookie-value2"
    });
  });

  it("should set a cookie", () => {
    cookieService.set("cookie-name", "cookie-value", {
      domain: "localhost",
      path: "/",
      secure: true
    });
    expect(documentMock.cookie).toEqual(
      "cookie-name=cookie-value; Domain=localhost; Path=/; Secure"
    );
  });
});

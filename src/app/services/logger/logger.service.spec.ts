import { TestBed } from "@angular/core/testing";
import * as Sentry from "@sentry/browser";
import { RewriteFrames } from "@sentry/integrations";
import { ConfigService } from "../config/config.service";
import { CorrelationService } from "../correlation/correlation.service";
import { ICorrelation } from "../correlation/__types__/ICorrelation";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { LoggerService } from "./logger.service";

const sentryScope = {
  setTags: jest.fn(),
  setExtra: jest.fn()
};
jest.mock("@sentry/browser", () => ({
  init: jest.fn(),
  withScope: jest.fn().mockImplementation((cb) => cb(sentryScope)),
  captureException: jest.fn()
}));
jest.mock("@sentry/integrations");

describe("LoggerService", () => {
  let configService: ServiceMock<ConfigService>;
  let correlationIdService: ServiceMock<CorrelationService>;
  const correlationInfo: ICorrelation = {
    deviceId: "deviceId",
    apiRequestId: "apiRequestId",
    pageScopedId: "pageScopedId"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useClass: mockService(ConfigService) },
        {
          provide: CorrelationService,
          useClass: mockService(CorrelationService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    });
    configService = TestBed.inject(ConfigService) as ServiceMock<ConfigService>;
    correlationIdService = TestBed.inject(CorrelationService) as ServiceMock<
      CorrelationService
    >;

    correlationIdService.getCorrelation.mockReturnValue(correlationInfo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialise Sentry", () => {
    const mockConfig = {
      sentryIO: {
        dsn: "sentry-dsn",
        sampleRate: 0.01,
        environment: "production"
      }
    };
    configService.getConfig.mockReturnValue(mockConfig);

    TestBed.inject(LoggerService);

    expect(Sentry.init).toHaveBeenCalledWith(
      expect.objectContaining({
        ...mockConfig.sentryIO,
        integrations: expect.arrayContaining([expect.any(RewriteFrames)]),
        environment: expect.anything()
      })
    );
  });

  it("should log debug when configured log level is debug", () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: "debug", format: "json" }
    });

    const service: LoggerService = TestBed.inject(LoggerService) as ServiceMock<
      LoggerService
    >;
    spyOn(console, "debug");

    service.debug("This should be logged as debug");

    expect(console["debug"]).toHaveBeenCalledWith(
      JSON.stringify(correlationInfo),
      "This should be logged as debug"
    );
  });

  it("should not log debug when configured log level is higher than debug", () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: "info", format: "json" }
    });

    const service: LoggerService = TestBed.inject(LoggerService) as ServiceMock<
      LoggerService
    >;
    spyOn(console, "debug");

    service.debug("This should not be logged as debug");

    expect(console["debug"]).not.toHaveBeenCalled();
  });

  it("should log error when configured log level is error", () => {
    const mockConfig = {
      loggerOptions: { level: "error", format: "json" },
      sentryIO: {
        dsn: "sentry-dsn",
        sampleRate: 0.01,
        environment: "production"
      }
    };
    configService.getConfig.mockReturnValue(mockConfig);

    const service: LoggerService = TestBed.inject(LoggerService) as ServiceMock<
      LoggerService
    >;
    spyOn(console, "error");

    const error = new Error("This should be logged as an error");
    service.error(error);

    expect(console.error).toHaveBeenCalledWith(
      JSON.stringify(correlationInfo),
      expect.stringContaining(error.toString())
    );
  });

  it("should log errors to Sentry", () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: "error", format: "json" }
    });

    const service: LoggerService = TestBed.inject(LoggerService) as ServiceMock<
      LoggerService
    >;

    const error = new Error("This should be logged as an error");
    const rest = [{ foo: "bar" }];
    service.error(error, ...rest);

    expect(Sentry.withScope).toHaveBeenCalled();
    expect(sentryScope.setTags).toHaveBeenCalledWith(correlationInfo);
    expect(sentryScope.setExtra).toHaveBeenCalledWith("extra_info", rest);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });

  it("should log warn when configured log level does not exist", () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: "non-existing-level", format: "json" }
    });

    const service: LoggerService = TestBed.inject(LoggerService) as ServiceMock<
      LoggerService
    >;
    spyOn(console, "warn");

    service.warn("This should be logged as a warn");

    expect(console.warn).toHaveBeenCalledWith(
      JSON.stringify(correlationInfo),
      "This should be logged as a warn"
    );
  });
});

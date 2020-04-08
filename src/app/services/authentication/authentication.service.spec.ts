import { TestBed } from "@angular/core/testing";
import { AnalyticsService } from "../analytics/analytics.service";
import { ConfigService } from "../config/config.service";
import { FeatureSwitchService } from "../feature-switch/feature-switch.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { Position } from "../script-injector/__types__/Position";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { WindowService } from "../window/window.service";
import { IStuffLogin } from "./__types__/IStuffLogin";
import { IStuffLoginUser } from "./__types__/IStuffLoginUser";
import { AuthenticationService } from "./authentication.service";

describe("AuthenticationService", () => {
  let authenticationService: ServiceMock<AuthenticationService>;
  let runtimeService: ServiceMock<RuntimeService>;
  let featureSwitchService: ServiceMock<FeatureSwitchService>;
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let configService: ServiceMock<ConfigService>;
  let windowService: ServiceMock<WindowService>;
  let analyticsService: ServiceMock<AnalyticsService>;

  let StuffLogin: IStuffLogin;
  const libraryUrl = "http://libraryurl.com";
  const authProvider = "https://my.preprod.stuff.co.nz";
  const clientId = "c0f1b219-297b-4104-8300-94c4636768da";
  const signinRedirectPath = "/spade/signin-callback-v2";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: FeatureSwitchService,
          useClass: mockService(FeatureSwitchService)
        },
        {
          provide: ScriptInjectorService,
          useClass: mockService(ScriptInjectorService)
        },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    });

    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    featureSwitchService = TestBed.inject(FeatureSwitchService) as ServiceMock<
      FeatureSwitchService
    >;
    scriptInjectorService = TestBed.inject(
      ScriptInjectorService
    ) as ServiceMock<ScriptInjectorService>;
    configService = TestBed.inject(ConfigService) as ServiceMock<ConfigService>;
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;

    StuffLogin = {
      init: jest.fn(),
      login: jest.fn(),
      signinCallback: jest.fn(),
      onLogin: jest.fn(),
      onLogout: jest.fn(),
      getUser: jest.fn()
    } as IStuffLogin;

    featureSwitchService.getFeature.mockResolvedValue(false);

    windowService.getWindow.mockReturnValue({
      StuffLogin,
      location: {
        host: "www.stuff.co.nz",
        protocol: "https:"
      }
    });

    configService.getConfig.mockReturnValue({
      loginLibrary: {
        libraryUrl: libraryUrl,
        authProvider: authProvider,
        clientId: clientId,
        signinRedirectPath: signinRedirectPath
      }
    });

    authenticationService = TestBed.inject(
      AuthenticationService
    ) as ServiceMock<AuthenticationService>;
  });

  it("should be created", () => {
    expect(authenticationService).toBeTruthy();
  });

  it("should delegate to script injector to load the script on setup", async () => {
    await authenticationService.setup();

    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      "login-sdk",
      libraryUrl,
      Position.HEAD,
      false
    );
  });

  it("should initiate the library with configuration as part of setup", async () => {
    await authenticationService.setup();

    expect(StuffLogin.init).toHaveBeenCalledWith({
      client_id: clientId,
      redirect_uri: `https://www.stuff.co.nz${signinRedirectPath}`,
      authority: authProvider
    });
  });

  it("should get current authentication state on library initialisation", async () => {
    const loggedInUser = {
      id_token: "yourIdToken",
      access_token: "yourAccessToken",
      profile: {
        sub: "1234",
        auth_time: 1508961560,
        kid: "sffx",
        jti: "0fab3adc-6106-4b20-bec6-45144b721b31",
        name: "user123",
        preferred_username: "user123@mail.com",
        given_name: "firstName",
        family_name: "surname",
        nickname: "user123",
        profile:
          "https://my.local.stuff.co.nz:8443/stuff-ssp-web//profile/user123",
        picture:
          "https://static2.stuff.co.nz/145453/static/images/profile_avatar_n_sm.gif",
        gender: "m",
        locale: "en_NZ",
        birthdate: "1992"
      }
    } as IStuffLoginUser;

    (StuffLogin.getUser as jest.Mock).mockResolvedValue(loggedInUser);

    authenticationService.authenticationStateChange.subscribe((user) => {
      expect(user).toBe(loggedInUser);
    });

    await authenticationService.setup();

    expect(analyticsService.setUserInDataLayer).toHaveBeenCalledWith(
      loggedInUser
    );
  });

  it("should register login/logout callbacks as part of setup", async () => {
    await authenticationService.setup();
    expect(StuffLogin.onLogin).toHaveBeenCalled();
    expect(StuffLogin.onLogout).toHaveBeenCalled();
  });

  it("should allow initiating login with underlying library", async () => {
    await authenticationService.setup();

    authenticationService.login();

    expect(StuffLogin.login).toHaveBeenCalled();
  });

  it("should allow do a signin callback with underlying library", async () => {
    await authenticationService.signinCallback();

    expect(StuffLogin.signinCallback).toHaveBeenCalled();
  });
});

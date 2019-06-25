import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { RuntimeService } from '../runtime/runtime.service';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { ConfigService } from '../config/config.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { Position } from '../script-injector/__types__/Position';
import { WindowService } from '../window/window.service';

describe('AuhtenticationService', () => {
  let authenticationService: AuthenticationService;
  let runtimeService: ServiceMock<RuntimeService>;
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let configService: ServiceMock<ConfigService>;
  let windowService: ServiceMock<WindowService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
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
        }
      ]
    });
    authenticationService = TestBed.get(AuthenticationService);
    runtimeService = TestBed.get(RuntimeService);
    scriptInjectorService = TestBed.get(ScriptInjectorService);
    configService = TestBed.get(ConfigService);
    windowService = TestBed.get(WindowService);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should delegate to script injector to load the script on setup', async () => {
    const libraryUrl = 'http://libraryurl.com';
    configService.getConfig.mockReturnValue({
      user: { loginLibrary: { libraryUrl: libraryUrl } }
    });
    windowService.getWindow.mockReturnValue({
      StuffLogin: { init: jest.fn() }
    });
    await authenticationService.setup();

    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      'login-sdk',
      libraryUrl,
      Position.HEAD,
      true
    );
  });

  it('should initiate the library with configuration as part of setup', async () => {
    const libraryUrl = 'http://libraryurl.com';
    const authProvider = 'https://my.preprod.stuff.co.nz';
    const clientId = 'c0f1b219-297b-4104-8300-94c4636768da';
    const signinRedirectUrl = 'signin-callback.html';
    configService.getConfig.mockReturnValue({
      user: {
        loginLibrary: {
          libraryUrl,
          authProvider,
          clientId,
          signinRedirectUrl
        }
      }
    });
    windowService.getWindow.mockReturnValue({
      StuffLogin: { init: jest.fn() }
    });

    await authenticationService.setup();

    expect(authenticationService.StuffLogin.init).toHaveBeenCalledWith({
      client_id: clientId,
      redirect_uri: signinRedirectUrl,
      authority: authProvider
    });
  });
});

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

  const libraryUrl = 'http://libraryurl.com';
  const authProvider = 'https://my.preprod.stuff.co.nz';
  const clientId = 'c0f1b219-297b-4104-8300-94c4636768da';
  const signinRedirectPath = 'signin-callback.html';

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

    windowService.getWindow.mockReturnValue({
      StuffLogin: {init: jest.fn()},
      location: {hostname: 'www.stuff.co.nz'}
    });


    configService.getConfig.mockReturnValue({
      loginLibrary: {
        libraryUrl: libraryUrl,
        authProvider: authProvider,
        clientId: clientId,
        signinRedirectPath: signinRedirectPath
      }
    });
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should delegate to script injector to load the script on setup', async () => {
    await authenticationService.setup();

    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      'login-sdk',
      libraryUrl,
      Position.HEAD,
      true
    );
  });

  it('should initiate the library with configuration as part of setup', async () => {
    await authenticationService.setup();

    expect(authenticationService.StuffLogin.init).toHaveBeenCalledWith({
      client_id: clientId,
      redirect_uri: `https://www.stuff.co.nz/${signinRedirectPath}`,
      authority: authProvider
    });
  });
});

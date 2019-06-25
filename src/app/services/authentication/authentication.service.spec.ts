import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { RuntimeService } from '../runtime/runtime.service';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { ConfigService } from '../config/config.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { Position } from '../script-injector/__types__/Position';

describe('AuhtenticationService', () => {
  let authenticationService: AuthenticationService;
  let runtimeService: ServiceMock<RuntimeService>;
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let configService: ServiceMock<ConfigService>;

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
        }
      ]
    });
    authenticationService = TestBed.get(AuthenticationService);
    runtimeService = TestBed.get(RuntimeService);
    scriptInjectorService = TestBed.get(ScriptInjectorService);
    configService = TestBed.get(ConfigService);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should delegate to script injector to load the script on setup', async () => {
    const libraryUrl = 'http://libraryurl.com';
    configService.getConfig.mockReturnValue({ user: { loginLibrary: { libraryUrl: libraryUrl }}});
    await authenticationService.setup();

    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      'login-sdk',
      libraryUrl,
      Position.HEAD,
      true
    );
  });

});

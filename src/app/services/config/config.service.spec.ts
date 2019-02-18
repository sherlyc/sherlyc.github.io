import * as configJson from './config.json';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { RuntimeService } from '../runtime/runtime.service';
import { RuntimeServiceMock } from '../runtime/runtime.service.mock';

describe('Config Service', () => {
  let configService: ConfigService;
  let runtimeServiceMock: RuntimeServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        {
          provide: RuntimeService,
          useClass: RuntimeServiceMock
        }
      ]
    });

    configService = TestBed.get(ConfigService);
    runtimeServiceMock = TestBed.get(RuntimeService);
  });

  afterEach(() => {
    delete process.env.SPADE_ENV;
    jest.resetModules();
  });

  it('should load config based on environment variable when running in SSR', () => {
    runtimeServiceMock.isServer.mockReturnValue(true);
    runtimeServiceMock.getEnvironmentVariable.mockReturnValue('staging');

    expect(configService.getConfig()).toEqual(configJson['staging']);
  });

  it('should fall back to production configuration when running in SSR and environment variable is not present', () => {
    runtimeServiceMock.isServer.mockReturnValue(true);
    runtimeServiceMock.getEnvironmentVariable.mockReturnValue(undefined);

    expect(configService.getConfig()).toEqual(configJson['production']);
  });

  it('should fall back to production configuration when running in SSR and environment variable is not recognized', () => {
    runtimeServiceMock.isServer.mockReturnValue(true);
    runtimeServiceMock.getEnvironmentVariable.mockReturnValue('something_else');

    expect(configService.getConfig()).toEqual(configJson['production']);
  });

  it('should load config based on retrieved transfer state when running in browser', () => {
    runtimeServiceMock.isServer.mockReturnValue(false);
    runtimeServiceMock.getEnvironmentVariable.mockReturnValue('staging');

    expect(configService.getConfig()).toEqual(configJson['staging']);
  });

  it('should fallback to production configuration when running in browser and transfer state is not retrieved', () => {
    runtimeServiceMock.isServer.mockReturnValue(false);
    runtimeServiceMock.getEnvironmentVariable.mockReturnValue(undefined);

    expect(configService.getConfig()).toEqual(configJson['production']);
  });

  it('should fallback to production configuration when running in browser and transfer state is not recognised', () => {
    runtimeServiceMock.isServer.mockReturnValue(false);
    runtimeServiceMock.getEnvironmentVariable.mockReturnValue('something_else');

    expect(configService.getConfig()).toEqual(configJson['production']);
  });
});

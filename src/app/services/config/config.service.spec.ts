import * as configJson from './config.json';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

describe('Config Service', () => {
  let configService: ConfigService;
  const transferStateMock: {
    get: jest.Mock;
    set: jest.Mock;
  } = {
    get: jest.fn(),
    set: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        {
          provide: PLATFORM_ID,
          useValue: {}
        },
        {
          provide: TransferState,
          useValue: transferStateMock
        }
      ]
    });

    configService = TestBed.get(ConfigService);
  });

  afterEach(() => {
    delete process.env.SPADE_ENV;
    jest.resetModules();
  });

  it('should load config based on environment variable when running in SSR', () => {
    process.env.SPADE_ENV = 'staging';
    configService.isServer = true;
    transferStateMock.get.mockReturnValue(null);

    expect(configService.getEnvironmentName()).toEqual('staging');
    expect(configService.getConfig()).toEqual(configJson['staging']);
    expect(transferStateMock.set).toHaveBeenCalled();
  });

  it('should fall back to production configuration when running in SSR and environment variable is not present', () => {
    configService.isServer = true;
    transferStateMock.get.mockReturnValue(null);

    expect(configService.getEnvironmentName()).toEqual('production');
    expect(configService.getConfig()).toEqual(configJson['production']);
  });

  it('should fall back to production configuration when running in SSR and environment variable is not recognized', () => {
    process.env.SPADE_ENV = 'something_else';
    configService.isServer = true;
    expect(configService.getEnvironmentName()).toEqual('something_else');
    expect(configService.getConfig()).toEqual(configJson['production']);
  });

  it('should load config based on retrieved transfer state when running in browser', () => {
    configService.isServer = false;
    transferStateMock.get.mockReturnValue('staging');

    expect(configService.getEnvironmentName()).toEqual('staging');
    expect(configService.getConfig()).toEqual(configJson['staging']);
  });

  it('should fallback to production configuration when running in browser and transfer state is not retrieved', () => {
    configService.isServer = false;
    transferStateMock.get.mockReturnValue(null);

    expect(configService.getEnvironmentName()).toEqual('production');
    expect(configService.getConfig()).toEqual(configJson['production']);
  });

  it('should fallback to production configuration when running in browser and transfer state is not recognised', () => {
    configService.isServer = false;
    transferStateMock.get.mockReturnValue('something_else');

    expect(configService.getEnvironmentName()).toEqual('something_else');
    expect(configService.getConfig()).toEqual(configJson['production']);
  });
});

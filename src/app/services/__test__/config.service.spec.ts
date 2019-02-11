import * as configJson from '../config.json';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '../config.service';
import { PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

describe('Config Service', () => {
  let configService: ConfigService;
  const state = new Map();

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
          useValue: {
            get: (key: any, defaultValue: any) =>
              state.get(key) || defaultValue,
            set: (key: any, value: any) => state.set(key, value)
          }
        }
      ]
    });

    configService = TestBed.get(ConfigService);
  });

  afterEach(() => {
    state.clear();
    delete process.env.SPADE_ENV;
    jest.resetModules();
  });

  it('should load config based on environment variable', () => {
    process.env.SPADE_ENV = 'staging';
    configService.isServer = true;
    const config = configService.getConfig();
    expect(config).toEqual(configJson['staging']);

    configService.isServer = false;
    expect(config).toEqual(configJson['staging']);
  });

  it('should fall back to production configuration when environment variable is not present', () => {
    configService.isServer = true;
    const config = configService.getConfig();
    expect(config).toEqual(configJson['production']);

    configService.isServer = false;
    expect(config).toEqual(configJson['production']);
  });

  it('should fall back to production configuration when environment variable is not recognized', () => {
    process.env.SPADE_ENV = 'something_else';
    configService.isServer = true;
    const config = configService.getConfig();
    expect(config).toEqual(configJson['production']);

    configService.isServer = false;
    expect(config).toEqual(configJson['production']);
  });
});

import { TestBed } from '@angular/core/testing';
import { RuntimeService } from './runtime.service';
import { TransferState } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { mockService, ServiceMock } from '../mocks/MockService';
import { WindowService } from '../window/window.service';

describe('RuntimeService', () => {
  let runtimeService: RuntimeService;
  let transferState: ServiceMock<TransferState>;
  let windowService: ServiceMock<WindowService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TransferState,
          useClass: mockService(TransferState)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: PLATFORM_ID,
          useValue: {}
        }
      ]
    });

    runtimeService = TestBed.get(RuntimeService);
    transferState = TestBed.get(TransferState);
    windowService = TestBed.get(WindowService);

    windowService.getWindow.mockReturnValue({
      location: {
        hostname: 'example.com'
      }
    });
  });

  afterEach(() => {
    process.env = {};
  });

  it('should get env variable in server when env var is set', () => {
    process.env = { SPADE_ENV: 'whatever' };

    const isServerSpy = jest.spyOn(runtimeService, 'isServer');
    isServerSpy.mockReturnValue(true);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(envVar).toEqual('whatever');
  });

  it('should get env variable in browser when the domain matches', () => {
    runtimeService.domainsByEnvironment = {
      whatever: ['example.com']
    };

    const isServerSpy = jest.spyOn(runtimeService, 'isServer');
    isServerSpy.mockReturnValue(false);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(envVar).toEqual('whatever');
  });

  it('should get default env variable in server when env var is not set', () => {
    const isServerSpy = jest.spyOn(runtimeService, 'isServer');
    isServerSpy.mockReturnValue(true);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(envVar).toEqual('defaultValue');
  });

  it('should get env variable in browser when the domain does not match any environment', () => {
    runtimeService.domainsByEnvironment = {
      whatever: []
    };

    const isServerSpy = jest.spyOn(runtimeService, 'isServer');
    isServerSpy.mockReturnValue(false);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(envVar).toEqual('defaultValue');
  });
});

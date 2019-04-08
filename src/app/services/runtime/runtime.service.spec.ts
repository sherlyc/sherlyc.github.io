import { TestBed } from '@angular/core/testing';
import { RuntimeService } from './runtime.service';
import { TransferState } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { mockService, ServiceMock } from '../mocks/MockService';

describe('RuntimeService', () => {
  let runtimeService: RuntimeService;
  let transferStateMock: ServiceMock<TransferState>;

  beforeAll(() => {
    // A workaround for an issue JSDOM window.location used by Jest cannot be writable
    // See also https://github.com/facebook/jest/issues/5124
    const windowLocation = JSON.stringify(window.location);
    delete window.location;
    Object.defineProperty(window, 'location', {
      value: JSON.parse(windowLocation)
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TransferState,
          useClass: mockService(TransferState)
        },
        {
          provide: PLATFORM_ID,
          useValue: {}
        }
      ]
    });

    runtimeService = TestBed.get(RuntimeService);
    transferStateMock = TestBed.get(TransferState);
  });

  afterEach(() => {
    process.env = {};
    window.location.hostname = '';
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
    window.location.hostname = 'example.com';

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
    window.location.hostname = 'example.com';

    const isServerSpy = jest.spyOn(runtimeService, 'isServer');
    isServerSpy.mockReturnValue(false);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(envVar).toEqual('defaultValue');
  });
});

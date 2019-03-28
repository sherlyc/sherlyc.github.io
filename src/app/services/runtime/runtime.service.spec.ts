import { TestBed } from '@angular/core/testing';

import { RuntimeService } from './runtime.service';
import { TransferState } from '@angular/platform-browser';
import { TransferStateMock } from '../mocks/transfer-state.mock';
import { PLATFORM_ID } from '@angular/core';

describe('RuntimeService', () => {
  let runtimeService: RuntimeService;
  let transferStateMock: TransferStateMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TransferState,
          useClass: TransferStateMock
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
    Object.defineProperty(window.location, 'hostname', {
      writable: true,
      value: ''
    });
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
      whatever: ['localhost']
    };
    Object.defineProperty(window.location, 'hostname', {
      writable: true,
      value: 'localhost'
    });

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
    Object.defineProperty(window.location, 'hostname', {
      writable: true,
      value: 'localhost'
    });

    const isServerSpy = jest.spyOn(runtimeService, 'isServer');
    isServerSpy.mockReturnValue(false);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(envVar).toEqual('defaultValue');
  });
});

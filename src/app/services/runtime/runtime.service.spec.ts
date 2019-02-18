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
  });

  it('should get env variable in server when transfer state already had a value', () => {
    transferStateMock.hasKey.mockReturnValue(true);
    transferStateMock.get.mockReturnValue('whatever');

    const isServerSpy = jest.spyOn(runtimeService, 'isServer');
    isServerSpy.mockReturnValue(true);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(envVar).toEqual('whatever');
  });

  it('should get env variable in browser when transfer state already had a value', () => {
    transferStateMock.hasKey.mockReturnValue(true);
    transferStateMock.get.mockReturnValue('whatever');

    const isServerSpy = jest.spyOn(runtimeService, 'isServer');
    isServerSpy.mockReturnValue(false);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(envVar).toEqual('whatever');
  });

  it('should get env variable in server when transfer state not existing and env var found', () => {
    transferStateMock.hasKey.mockReturnValue(false);

    const isServerSpy = jest.spyOn(runtimeService, 'isServer');
    isServerSpy.mockReturnValue(true);

    process.env.SPADE_ENV = 'whatever';
    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(isServerSpy).toHaveBeenCalled();
    expect(envVar).toEqual('whatever');
  });

  it(
    'should get env variable with a default value in server with a default value ' +
      'when transfer state not existing and env var not found',
    () => {
      transferStateMock.hasKey.mockReturnValue(false);

      const isServerSpy = jest.spyOn(runtimeService, 'isServer');
      isServerSpy.mockReturnValue(true);

      delete process.env.SPADE_ENV;

      const envVar = runtimeService.getEnvironmentVariable(
        'SPADE_ENV',
        'defaultValue'
      );

      expect(isServerSpy).toHaveBeenCalled();
      expect(envVar).toEqual('defaultValue');
    }
  );

  it('should get env variable  with a default value in browser when transfer state not existing', () => {
    transferStateMock.hasKey.mockReturnValue(false);

    const isServerSpy = jest.spyOn(runtimeService, 'isServer');
    isServerSpy.mockReturnValue(false);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(isServerSpy).toHaveBeenCalled();
    expect(envVar).toEqual('defaultValue');
  });
});

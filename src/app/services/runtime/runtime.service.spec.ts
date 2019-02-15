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
    transferStateMock.get.mockReturnValue('whatever');

    const isRunInServerSpy = jest.spyOn(runtimeService, 'isRunInServer');
    isRunInServerSpy.mockReturnValue(true);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(envVar).toEqual('whatever');
  });

  it('should get env variable in browser when transfer state already had a value', () => {
    transferStateMock.get.mockReturnValue('whatever');

    const isRunInServerSpy = jest.spyOn(runtimeService, 'isRunInServer');
    isRunInServerSpy.mockReturnValue(false);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(envVar).toEqual('whatever');
  });

  it('should get env variable in server when transfer state not existing and env var found', () => {
    transferStateMock.get.mockReturnValue(undefined);

    const isRunInServerSpy = jest.spyOn(runtimeService, 'isRunInServer');
    isRunInServerSpy.mockReturnValue(true);

    process.env.SPADE_ENV = 'whatever';
    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(isRunInServerSpy).toHaveBeenCalled();
    expect(envVar).toEqual('whatever');
  });

  it(
    'should get env variable with a default value in server with a default value ' +
      'when transfer state not existing and env var not found',
    () => {
      transferStateMock.get.mockReturnValue(undefined);

      const isRunInServerSpy = jest.spyOn(runtimeService, 'isRunInServer');
      isRunInServerSpy.mockReturnValue(true);

      delete process.env.SPADE_ENV;

      const envVar = runtimeService.getEnvironmentVariable(
        'SPADE_ENV',
        'defaultValue'
      );

      expect(isRunInServerSpy).toHaveBeenCalled();
      expect(envVar).toEqual('defaultValue');
    }
  );

  it('should get env variable  with a default value in browser when transfer state not existing', () => {
    transferStateMock.get.mockReturnValue(undefined);

    const isRunInServerSpy = jest.spyOn(runtimeService, 'isRunInServer');
    isRunInServerSpy.mockReturnValue(false);

    const envVar = runtimeService.getEnvironmentVariable(
      'SPADE_ENV',
      'defaultValue'
    );

    expect(isRunInServerSpy).toHaveBeenCalled();
    expect(envVar).toEqual('defaultValue');
  });
});

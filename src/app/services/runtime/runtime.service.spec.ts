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

  it('should be created', () => {
    expect(runtimeService).toBeTruthy();
  });
});

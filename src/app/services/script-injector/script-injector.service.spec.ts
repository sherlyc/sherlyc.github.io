import { TestBed } from '@angular/core/testing';

import { ScriptInjectorService } from './script-injector.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { RuntimeService } from '../runtime/runtime.service';

describe('ScriptInjectorService', () => {
  let runtimeServiceMock: ServiceMock<RuntimeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    });
    runtimeServiceMock = TestBed.get(RuntimeService);
  });

  it('should be created', () => {
    const service: ScriptInjectorService = TestBed.get(ScriptInjectorService);
    expect(service).toBeTruthy();
  });
});

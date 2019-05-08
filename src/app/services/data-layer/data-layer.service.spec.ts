import { TestBed } from '@angular/core/testing';
import { DataLayerService } from './data-layer.service';
import { RuntimeService } from '../runtime/runtime.service';
import { ServiceMock, mockService } from '../mocks/MockService';

declare const window: {
  digitalData: any;
};

describe('DataLayerService', () => {
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    });
    runtimeService = TestBed.get(RuntimeService);
  });

  afterEach(() => {
    window.digitalData = undefined;
  });

  it('should be created', () => {
    const service = TestBed.get(DataLayerService);
    expect(service).toBeTruthy();
  });

  it('should assign digitalData object to the window if running in browser', () => {
    runtimeService.isBrowser.mockReturnValue(true);

    const service = TestBed.get(DataLayerService);
    service.setup();

    expect(window.digitalData).toBeTruthy();
  });

  it('should not assign digitalData object to the window if not running in browser', () => {
    runtimeService.isBrowser.mockReturnValue(false);

    const service = TestBed.get(DataLayerService);
    service.setup();

    expect(window.digitalData).toBeFalsy();
  });
});

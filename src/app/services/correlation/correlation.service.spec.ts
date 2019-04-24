import { TestBed, async } from '@angular/core/testing';
import * as Fingerprint2 from 'fingerprintjs2';
import * as store from 'store';
import { CorrelationService } from './correlation.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { StoreService } from '../store/store.service';
import { RuntimeService } from '../runtime/runtime.service';

jest.mock('fingerprintjs2');
jest.mock('store');

describe('CorrelationService should', () => {
  let correlationIdService: CorrelationService;
  let storeService: StoreService;
  let runtimeService: ServiceMock<RuntimeService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StoreService,
          useClass: mockService(StoreService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    });
    correlationIdService = TestBed.get(CorrelationService);
    storeService = TestBed.get(StoreService);
    runtimeService = TestBed.get(RuntimeService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('be created', () => {
    expect(correlationIdService).toBeTruthy();
  });

  it('generate page scoped id', () => {
    correlationIdService.generatePageScopedId();
    expect(correlationIdService.getPageScopedId()).toBeTruthy();
  });

  it('set api request id', () => {
    const apiRequestId = 'apiRequestId';
    correlationIdService.setApiRequestId(apiRequestId);

    expect(correlationIdService.getApiRequestId()).toEqual(apiRequestId);
  });

  it('should create and set deviceId to local storage if not yet exist', async () => {
    runtimeService.isServer.mockReturnValue(false);
    (storeService.get as jest.Mock).mockReturnValue(null);
    (Fingerprint2.getPromise as jest.Mock).mockResolvedValue([{ value: '1' }]);
    const hashDeviceId = 'generatedDeviceId';
    (Fingerprint2.x64hash128 as jest.Mock).mockReturnValue(hashDeviceId);

    const deviceId = await correlationIdService.getDeviceId();

    expect(deviceId).toEqual(hashDeviceId);
  });

  it('should not create and set deviceId to local storage if already exists', async () => {
    runtimeService.isServer.mockReturnValue(false);
    (storeService.get as jest.Mock).mockReturnValue('deviceId');

    await correlationIdService.getDeviceId();

    expect(store.set).not.toHaveBeenCalled();
  });

  it('should return warning message if running getDeviceId in server', async () => {
    runtimeService.isServer.mockReturnValue(true);

    const result = await correlationIdService.getDeviceId();

    expect(result).toContain('not supported');
  });
});

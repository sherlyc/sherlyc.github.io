import { TestBed } from '@angular/core/testing';
import { DataLayerService } from './data-layer.service';
import { RuntimeService } from '../runtime/runtime.service';
import { ServiceMock, mockService } from '../mocks/MockService';
import { IDigitalData } from './__types__/IDigitalData';

declare let window: {
  digitalData: IDigitalData;
};

describe('DataLayerService', () => {
  let runtimeService: ServiceMock<RuntimeService>;
  let dataLayerService: DataLayerService;

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
    dataLayerService = TestBed.get(DataLayerService);
  });

  afterEach(() => {
    window.digitalData = {} as IDigitalData;
  });

  it('should be created', () => {
    expect(dataLayerService).toBeTruthy();
  });

  it('should assign digitalData object to the window if running in browser', () => {
    runtimeService.isBrowser.mockReturnValue(true);

    dataLayerService.setup();

    expect(window.digitalData).toBeTruthy();
  });

  it('should not assign digitalData object to the window if not running in browser', () => {
    runtimeService.isBrowser.mockReturnValue(false);

    dataLayerService.setup();

    expect(window.digitalData).toEqual({});
  });

  it('should push analytics if running in browser', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    dataLayerService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'button.toggle',
      button: 'closed'
    };
    dataLayerService.pushEvent(event);

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });
});

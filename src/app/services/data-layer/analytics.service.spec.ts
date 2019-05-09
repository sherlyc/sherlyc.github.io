import { TestBed } from '@angular/core/testing';
import { AnalyticsService } from './analytics.service';
import { RuntimeService } from '../runtime/runtime.service';
import { ServiceMock, mockService } from '../mocks/MockService';
import { IDigitalData } from './__types__/IDigitalData';

declare let window: {
  digitalData: IDigitalData;
};

describe('AnalyticsService', () => {
  let runtimeService: ServiceMock<RuntimeService>;
  let analyticsService: AnalyticsService;

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
    analyticsService = TestBed.get(AnalyticsService);
  });

  afterEach(() => {
    window.digitalData = {} as IDigitalData;
  });

  it('should be created', () => {
    expect(analyticsService).toBeTruthy();
  });

  it('should assign digitalData object to the window if running in browser', () => {
    runtimeService.isBrowser.mockReturnValue(true);

    analyticsService.setup();

    expect(window.digitalData).toBeTruthy();
  });

  it('should not assign digitalData object to the window if not running in browser', () => {
    runtimeService.isBrowser.mockReturnValue(false);

    analyticsService.setup();

    expect(window.digitalData).toEqual({});
  });

  it('should push analytics if running in browser', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'button.toggle',
      button: 'closed'
    };
    analyticsService.pushEvent(event);

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { AnalyticsService } from './analytics.service';
import { ServiceMock, mockService } from '../mocks/MockService';
import { WindowService } from '../window/window.service';

describe('AnalyticsService', () => {
  let analyticsService: AnalyticsService;
  let windowService: ServiceMock<WindowService>;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        }
      ]
    });
    analyticsService = TestBed.get(AnalyticsService);
    windowService = TestBed.get(WindowService);
  });

  it('should be created', () => {
    expect(analyticsService).toBeTruthy();
  });

  it('should assign digitalData object to the window', () => {
    windowService.getWindow.mockReturnValue({});

    analyticsService.setup();

    expect(windowService.getWindow().digitalData).toBeTruthy();
  });

  it('should push analytics to the window', () => {
    windowService.getWindow.mockReturnValue({});

    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();
    const event = {
      event: 'button.toggle',
      button: 'closed'
    };
    analyticsService.pushEvent(event);

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });
});

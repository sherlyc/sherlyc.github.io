import { TestBed } from '@angular/core/testing';
import { AnalyticsService } from './analytics.service';
import { RuntimeService } from '../runtime/runtime.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { IDigitalData } from './__types__/IDigitalData';
import { AnalyticsEventsType } from './__types__/AnalyticsEventsType';

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

  it('should push corresponding analytics when weather bar is opened', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'weather.location.bar',
      'weather.bar': 'opened'
    };
    analyticsService.pushEvent(AnalyticsEventsType.WEATHER_BAR_OPENED);

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when weather bar is closed', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'weather.location.bar',
      'weather.bar': 'closed'
    };
    analyticsService.pushEvent(AnalyticsEventsType.WEATHER_BAR_CLOSED);

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when weather bar is closed with exit button', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'weather.location.exit'
    };
    analyticsService.pushEvent(AnalyticsEventsType.WEATHER_EXIT_BUTTON);

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when weather bar is closed with exit button', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'weather.location.change',
      'weather.location': 'Auckland'
    };

    analyticsService.pushEvent(AnalyticsEventsType.WEATHER_LOCATION_CHANGED, new Map().set('location', 'Auckland'));

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when the navigation menu is open', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'menu.nav'
    };
    analyticsService.pushEvent(AnalyticsEventsType.MENU_NAV_OPENED);

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when the navigation menu is closed ', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'close.menu.nav'
    };
    analyticsService.pushEvent(AnalyticsEventsType.MENU_NAV_CLOSED);

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when the stuff logo of top menu is clicked ', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'stuff.logo'
    };
    analyticsService.pushEvent(AnalyticsEventsType.STUFF_LOGO_CLICKED);

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when a link on footer menu is clicked ', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'menu.footer',
      'menu.link': 'twitter'
    };
    analyticsService.pushEvent(AnalyticsEventsType.FOOTER_MENU, new Map().set('name', 'twitter'));

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when the breaking news banner is open', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'breaking.news.open'
    };
    analyticsService.pushEvent(AnalyticsEventsType.BREAKING_NEWS_OPEN);

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when the breaking news banner is closed', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    analyticsService.setup();
    window.digitalData.events.push = jest.fn();

    const event = {
      event: 'breaking.news.close'
    };
    analyticsService.pushEvent(AnalyticsEventsType.BREAKING_NEWS_CLOSE);

    expect(window.digitalData.events.push).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });
});

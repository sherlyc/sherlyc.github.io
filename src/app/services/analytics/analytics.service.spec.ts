import { TestBed } from '@angular/core/testing';
import { AnalyticsService } from './analytics.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { AnalyticsEventsType } from './__types__/AnalyticsEventsType';
import { WindowService } from '../window/window.service';
import { LoggerService } from '../logger/logger.service';

describe('AnalyticsService', () => {
  let windowService: ServiceMock<WindowService>;
  let analyticsService: AnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        }
      ]
    });
    analyticsService = TestBed.get(AnalyticsService);
    windowService = TestBed.get(WindowService);
    windowService.getWindow.mockReturnValue({});
  });

  it('should be created', () => {
    expect(analyticsService).toBeTruthy();
  });

  it('should assign digitalData object to the window ', () => {
    analyticsService.setup();

    expect(windowService.getWindow().digitalData).toBeTruthy();
  });

  it('should inject correct values (section should be empty) into digitalData object for ads to work', () => {
    analyticsService.setup();

    expect(windowService.getWindow().digitalData.page.ads).toEqual({
      environment: 'prod',
      exclusions: '',
      sections: []
    });
  });

  it('should push corresponding analytics when weather bar is closed with exit button', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: 'weather.location.change',
      'weather.location': 'Auckland'
    };

    analyticsService.pushEvent(
      AnalyticsEventsType.WEATHER_LOCATION_CHANGED,
      new Map().set('location', 'Auckland')
    );

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when the stuff logo of top menu is clicked ', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: 'stuff.logo'
    };
    analyticsService.pushEvent(AnalyticsEventsType.STUFF_LOGO_CLICKED);

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when a link on footer menu is clicked ', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: 'menu.footer',
      'menu.link': 'twitter'
    };
    analyticsService.pushEvent(
      AnalyticsEventsType.FOOTER_MENU,
      new Map().set('name', 'twitter')
    );

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when the breaking news banner is open', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: 'breaking.news.open'
    };
    analyticsService.pushEvent(AnalyticsEventsType.BREAKING_NEWS_OPEN);

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when the breaking news banner is closed', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: 'breaking.news.close'
    };
    analyticsService.pushEvent(AnalyticsEventsType.BREAKING_NEWS_CLOSE);

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when the more button is clicked', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: 'more.content.button',
      'more.content.url': '/national'
    };
    analyticsService.pushEvent(
      AnalyticsEventsType.MORE_BUTTON_CLICKED,
      new Map().set('url', '/national')
    );

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when menu section is clicked', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: 'menu.nav',
      'menu.nav.section': 'Entertainment'
    };

    analyticsService.pushEvent(
      AnalyticsEventsType.MENU_NAV_SECTION_CLICKED,
      new Map().set('section', 'Entertainment')
    );

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics for breaking news experiment', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const variant = 'purpleHeadline';
    const experiment = 'Toucan';
    const event = {
      event: 'ab.testing.event',
      'ab.testing.segment.web': variant,
      'ab.testing.experiment.name': experiment
    };
    const extra = new Map();
    extra.set('variant', variant);
    extra.set('experiment', experiment);

    analyticsService.pushEvent(
      AnalyticsEventsType.BREAKING_NEWS_EXPERIMENT,
      extra
    );

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });
});

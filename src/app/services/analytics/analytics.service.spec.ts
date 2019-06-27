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

    analyticsService.pushEvent({
      type: AnalyticsEventsType.WEATHER_LOCATION_CHANGED,
      location: 'Auckland'
    });

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
    analyticsService.pushEvent({
      type: AnalyticsEventsType.STUFF_LOGO_CLICKED
    });

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
    analyticsService.pushEvent({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: 'twitter'
    });

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
    analyticsService.pushEvent({
      type: AnalyticsEventsType.BREAKING_NEWS_OPENED
    });
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
    analyticsService.pushEvent({
      type: AnalyticsEventsType.BREAKING_NEWS_CLOSED
    });

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
    analyticsService.pushEvent({
      type: AnalyticsEventsType.MORE_BUTTON_CLICKED,
      url: '/national'
    });

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

    analyticsService.pushEvent({
      type: AnalyticsEventsType.MENU_NAV_SECTION_CLICKED,
      section: 'Entertainment'
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics when homepage strap is clicked', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const strapName = 'National';
    const headline = 'Headline';
    const articleId = '123123';
    const event = {
      event: 'homepage.strap.click',
      'homepage.strap': strapName,
      'article.headline': headline,
      'article.id': articleId
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: headline,
      articleId: articleId
    });

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

    analyticsService.pushEvent({
      type: AnalyticsEventsType.EXPERIMENT,
      variant,
      experiment
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics for login text clicked', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: 'login.signup.click',
      'login.signup.location': 'top'
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.LOGIN_CLIKED
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });

  it('should push corresponding analytics for login text clicked', () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: 'avatar.click'
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.AVATAR_CLICKED
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: 'analytics',
      ...event
    });
  });
});

import { Injectable } from '@angular/core';
import { DeviceType } from './__types__/DeviceType';
import { AnalyticsEventsType } from './__types__/AnalyticsEventsType';
import { IAdobeAnalyticsEvent } from './__types__/IAdobeAnalyticsEvent';
import { LoggerService } from '../logger/logger.service';
import { IAnalyticsService } from './__types__/IAnalyticsService';
import { WindowService } from '../window/window.service';

const home = 'home';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService implements IAnalyticsService {
  constructor(
    private logger: LoggerService,
    private windowService: WindowService
  ) {}

  setup() {
    this.windowService.getWindow().digitalData = {
      page: {
        pageInfo: {
          pageID: home,
          pageName: 'Stuff home',
          sysEnv: DeviceType.mobile,
          variant: '1',
          version: '1',
          publisher: '',
          articleID: '',
          headline: '',
          author: '',
          source: '',
          lastPublishedTime: ''
        },
        category: {
          pageType: home,
          primaryCategory: home
        },
        ads: {
          environment: '',
          exclusions: '',
          sections: ['']
        }
      },
      user: [
        {
          profile: [
            {
              profileInfo: {
                uid: ''
              }
            }
          ],
          segment: {}
        }
      ],
      events: []
    };
  }

  pushEvent(event: AnalyticsEventsType, extra?: Map<string, string>) {
    try {
      this.windowService
        .getWindow()
        .digitalData.events.push(this.transformEvent(event, extra));
    } catch (err) {
      this.logger.error(err);
    }
  }

  private transformEvent(
    event: AnalyticsEventsType,
    extra?: Map<string, string>
  ): IAdobeAnalyticsEvent {
    let adobeEvent = {} as IAdobeAnalyticsEvent;

    switch (event) {
      case AnalyticsEventsType.WEATHER_BAR_OPENED: {
        adobeEvent = {
          event: 'weather.location.bar',
          'weather.bar': 'opened'
        };
        break;
      }
      case AnalyticsEventsType.WEATHER_BAR_CLOSED: {
        adobeEvent = {
          event: 'weather.location.bar',
          'weather.bar': 'closed'
        };
        break;
      }
      case AnalyticsEventsType.WEATHER_EXIT_BUTTON: {
        adobeEvent = {
          event: 'weather.location.exit'
        };
        break;
      }
      case AnalyticsEventsType.WEATHER_LOCATION_CHANGED: {
        adobeEvent = {
          event: 'weather.location.change',
          'weather.location': <string>extra!.get('location')
        };
        break;
      }
      case AnalyticsEventsType.MENU_NAV_OPENED: {
        adobeEvent = {
          event: 'menu.nav'
        };
        break;
      }
      case AnalyticsEventsType.MENU_NAV_CLOSED: {
        adobeEvent = {
          event: 'close.menu.nav'
        };
        break;
      }
      case AnalyticsEventsType.STUFF_LOGO_CLICKED: {
        adobeEvent = {
          event: 'stuff.logo'
        };
        break;
      }
      case AnalyticsEventsType.FOOTER_MENU: {
        adobeEvent = {
          event: 'menu.footer',
          'menu.link': <string>extra!.get('name')
        };
        break;
      }
      case AnalyticsEventsType.BREAKING_NEWS_OPEN: {
        adobeEvent = {
          event: 'breaking.news.open'
        };
        break;
      }
      case AnalyticsEventsType.BREAKING_NEWS_CLOSE: {
        adobeEvent = {
          event: 'breaking.news.close'
        };
        break;
      }
      case AnalyticsEventsType.MORE_BUTTON_CLICKED: {
        adobeEvent = {
          event: 'more.content.button',
          'more.content.url': <string>extra!.get('url')
        };
        break;
      }
      case AnalyticsEventsType.MENU_NAV_SECTION_CLICKED: {
        adobeEvent = {
          event: 'menu.nav',
          'menu.nav.section': <string>extra!.get('section')
        };
        break;
      }
      default: {
        this.logger.warn('Non existent Adobe analytic event ', event);
        break;
      }
    }

    return { type: 'analytics', ...adobeEvent };
  }
}

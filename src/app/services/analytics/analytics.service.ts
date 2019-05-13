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

    const eventTypesRegistry: { [key in AnalyticsEventsType]: Function } = {
      [AnalyticsEventsType.WEATHER_BAR_OPENED]: () =>
        (adobeEvent = {
          event: 'weather.location.bar',
          'weather.bar': 'opened'
        }),
      [AnalyticsEventsType.WEATHER_BAR_CLOSED]: () =>
        (adobeEvent = {
          event: 'weather.location.bar',
          'weather.bar': 'closed'
        }),
      [AnalyticsEventsType.WEATHER_EXIT_BUTTON]: () =>
        (adobeEvent = {
          event: 'weather.location.exit'
        }),
      [AnalyticsEventsType.WEATHER_LOCATION_CHANGED]: (
        extraParams?: Map<string, string>
      ) =>
        (adobeEvent = {
          event: 'weather.location.change',
          'weather.location': <string>extraParams!.get('location')
        }),
      [AnalyticsEventsType.MENU_NAV_OPENED]: () =>
        (adobeEvent = {
          event: 'menu.nav'
        }),
      [AnalyticsEventsType.MENU_NAV_CLOSED]: () =>
        (adobeEvent = {
          event: 'close.menu.nav'
        }),
      [AnalyticsEventsType.STUFF_LOGO_CLICKED]: () =>
        (adobeEvent = {
          event: 'stuff.logo'
        }),
      [AnalyticsEventsType.FOOTER_MENU]: (extraParams?: Map<string, string>) =>
        (adobeEvent = {
          event: 'menu.footer',
          'menu.link': <string>extraParams!.get('name')
        }),
      [AnalyticsEventsType.BREAKING_NEWS_OPEN]: () =>
        (adobeEvent = {
          event: 'breaking.news.open'
        }),
      [AnalyticsEventsType.BREAKING_NEWS_CLOSE]: () =>
        (adobeEvent = {
          event: 'breaking.news.close'
        }),
      [AnalyticsEventsType.MORE_BUTTON_CLICKED]: (
        extraParams?: Map<string, string>
      ) =>
        (adobeEvent = {
          event: 'more.content.button',
          'more.content.url': <string>extraParams!.get('url')
        }),
      [AnalyticsEventsType.MENU_NAV_SECTION_CLICKED]: (
        extraParams?: Map<string, string>
      ) =>
        (adobeEvent = {
          event: 'menu.nav',
          'menu.nav.section': <string>extraParams!.get('section')
        })
    };

    eventTypesRegistry[event](extra);

    return { type: 'analytics', ...adobeEvent };
  }
}

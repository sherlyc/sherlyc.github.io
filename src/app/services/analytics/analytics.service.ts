import { Injectable } from '@angular/core';
import { DeviceType } from './__types__/DeviceType';
import { AnalyticsEventsType } from './__types__/AnalyticsEventsType';
import { IAdobeAnalyticsEvent } from './__types__/IAdobeAnalyticsEvent';
import { LoggerService } from '../logger/logger.service';
import { IAnalyticsService } from './__types__/IAnalyticsService';
import { WindowService } from '../window/window.service';
import {
  AnalyticsEvent,
  IExperimentAssigned,
  IFooterMenuClicked,
  IHomepageStrapClicked,
  IMenuNavSectionClicked,
  IMoreButtonClicked,
  IWeatherLocationChanged
} from './__types__/IAnalyticEvents';

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
          environment: 'prod',
          exclusions: '',
          sections: []
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

  pushEvent(event: AnalyticsEvent) {
    try {
      this.windowService
        .getWindow()
        .digitalData.events.push(this.transformEvent(event));
    } catch (err) {
      this.logger.error(err);
    }
  }

  private transformEvent(event: AnalyticsEvent): IAdobeAnalyticsEvent {
    let adobeEvent = {} as IAdobeAnalyticsEvent;

    const eventTypesRegistry: { [key in AnalyticsEventsType]: Function } = {
      [AnalyticsEventsType.WEATHER_LOCATION_CHANGED]: (
        analyticEvent: IWeatherLocationChanged
      ) =>
        (adobeEvent = {
          event: 'weather.location.change',
          'weather.location': analyticEvent!.location
        }),
      [AnalyticsEventsType.MENU_NAV_OPENED]: () =>
        (adobeEvent = {
          event: 'menu.nav'
        }),
      [AnalyticsEventsType.STUFF_LOGO_CLICKED]: () =>
        (adobeEvent = {
          event: 'stuff.logo'
        }),
      [AnalyticsEventsType.FOOTER_MENU_CLICKED]: (
        analyticEvent: IFooterMenuClicked
      ) =>
        (adobeEvent = {
          event: 'menu.footer',
          'menu.link': analyticEvent.name
        }),
      [AnalyticsEventsType.BREAKING_NEWS_OPENED]: () =>
        (adobeEvent = {
          event: `breaking.news.open`
        }),
      [AnalyticsEventsType.BREAKING_NEWS_CLOSED]: () =>
        (adobeEvent = {
          event: `breaking.news.close`
        }),
      [AnalyticsEventsType.MORE_BUTTON_CLICKED]: (
        analyticEvent: IMoreButtonClicked
      ) =>
        (adobeEvent = {
          event: 'more.content.button',
          'more.content.url': analyticEvent.url
        }),
      [AnalyticsEventsType.MENU_NAV_SECTION_CLICKED]: (
        analyticEvent: IMenuNavSectionClicked
      ) =>
        (adobeEvent = {
          event: 'menu.nav',
          'menu.nav.section': analyticEvent.section
        }),
      [AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED]: (
        analyticEvent: IHomepageStrapClicked
      ) =>
        (adobeEvent = {
          event: 'homepage.strap.click',
          'homepage.strap': analyticEvent.strapName,
          'article.headline': analyticEvent.articleHeadline,
          'article.id': analyticEvent.articleId
        }),
      [AnalyticsEventsType.EXPERIMENT]: (analyticEvent: IExperimentAssigned) =>
        (adobeEvent = {
          event: 'ab.testing.event',
          'ab.testing.segment.web': analyticEvent.variant,
          'ab.testing.experiment.name': analyticEvent.experiment
        })
    };

    eventTypesRegistry[event.type](event);

    return { type: 'analytics', ...adobeEvent };
  }
}

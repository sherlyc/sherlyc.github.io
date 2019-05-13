import { Injectable } from '@angular/core';
import { DeviceType } from './__types__/DeviceType';
import { WindowService } from '../window/window.service';
import { IAnalyticsEvent } from './__types__/IAnalyticsEvent';

const home = 'home';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private windowService: WindowService) {}

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

  pushEvent(event: IAnalyticsEvent) {
    this.windowService
      .getWindow()
      .digitalData.events.push({ type: 'analytics', ...event });
  }
}

import { Injectable } from '@angular/core';
import { IDigitalData } from './__types__/IDigitalData';
import { DeviceType } from './__types__/DeviceType';
import { RuntimeService } from '../runtime/runtime.service';
import { IEvent } from './__types__/IEvent';

declare const window: {
  digitalData: IDigitalData;
};

const home = 'home';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  constructor(private runtimeService: RuntimeService) {}

  setup() {
    if (this.runtimeService.isBrowser()) {
      window.digitalData = {
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
  }

  pushEvent(event: IEvent) {
    if (this.runtimeService.isBrowser()) {
      window.digitalData.events.push(event);
    }
  }
}

import { Injectable } from '@angular/core';
import { IDigitalData } from './__types__/IDigitalData';
import { DeviceType } from './__types__/DeviceType';

declare const window: {
  digitalData: IDigitalData;
};

const home = 'home';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  constructor() {}

  setup() {
    window.digitalData = {
      page: {
        pageInfo: {
          pageID: home,
          pageName: '',
          sysEnv: DeviceType.mobile,
          variant: '',
          version: '',
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

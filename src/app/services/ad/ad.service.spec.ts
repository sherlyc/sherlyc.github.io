import { TestBed } from '@angular/core/testing';

import { AdService } from './ad.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ConnectableObservable, Observable, Subscriber } from 'rxjs';
import { publish } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { DOCUMENT } from '@angular/common';
import { mockService, ServiceMock } from '../mocks/MockService';

describe('AdService', () => {
  let routerEventEmitter: Subscriber<RouterEvent>;
  let routerMock: Pick<Router, 'events'>;
  let configMock: ServiceMock<ConfigService>;
  let adService: AdService;

  beforeEach(() => {
    routerMock = {
      events: new Observable((e: Subscriber<RouterEvent>) => {
        routerEventEmitter = e;
      }).pipe(publish())
    };
    (routerMock.events as ConnectableObservable<RouterEvent>).connect();

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        }
      ]
    });
    configMock = TestBed.get(ConfigService);
    adService = TestBed.get(AdService);
  });

  it('should be created', () => {
    expect(adService).toBeTruthy();
  });

  it('should create <script tag at the bottom of body', () => {
    const aadSdkUrl = 'http://whatever_url/';
    configMock.getConfig.mockReturnValue({ aadSdkUrl });
    adService.setupAds();

    const document: Document = TestBed.get(DOCUMENT);

    const aadSdkElements = document.querySelectorAll('#aad-sdk');
    expect(aadSdkElements).toHaveLength(1);
    const aadSdkScriptElement = aadSdkElements[0] as HTMLScriptElement;
    expect(aadSdkScriptElement).toEqual(document.body.lastElementChild);
    expect(aadSdkScriptElement.id).toEqual('aad-sdk');
    expect(aadSdkScriptElement.src).toEqual(aadSdkUrl);
  });

  it('should dispatch DOM NavigationEnd when router navigation ends', (done) => {
    const aadSdkUrl = 'http://whatever_url/';
    configMock.getConfig.mockReturnValue({ aadSdkUrl });
    adService.setupAds();

    const document: Document = TestBed.get(DOCUMENT);

    document.addEventListener('NavigationEnd', (e: Event) => {
      expect(e.type).toEqual('NavigationEnd');
      done();
    });

    routerEventEmitter.next(new NavigationEnd(0, '/', ''));
  });
});

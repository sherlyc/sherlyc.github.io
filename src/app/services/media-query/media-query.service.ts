import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DeviceType } from "../../../../common/DeviceType";
import { RuntimeService } from "../runtime/runtime.service";
import { WindowService } from "../window/window.service";

interface IMediaQueryEntry {
  device: DeviceType;
  mediaQueryList: MediaQueryList;
  mediaQueryListListener: (event: MediaQueryListEvent) => void;
}

enum MediaQuery {
  Mobile = "only screen and (max-width: 767px)",
  Tablet = "only screen and (min-width: 768px) and (max-width: 991px)",
  Desktop = "only screen and (min-width: 992px)"
}

@Injectable({
  providedIn: "root"
})
export class MediaQueryService implements OnDestroy {
  breakpointObserver = new BehaviorSubject<DeviceType>(DeviceType.desktop);

  mediaQueries: IMediaQueryEntry[] = [];

  constructor(
    private runtimeService: RuntimeService,
    private windowService: WindowService
  ) {
    this.init();
  }

  init() {
    if (this.runtimeService.isServer()) {
      return;
    }
    this.mediaQueries = [
      {
        device: DeviceType.desktop,
        mediaQueryList: this.windowService
          .getWindow()
          .matchMedia(MediaQuery.Desktop),
        mediaQueryListListener: this.listener(DeviceType.desktop)
      },
      {
        device: DeviceType.tablet,
        mediaQueryList: this.windowService
          .getWindow()
          .matchMedia(MediaQuery.Tablet),
        mediaQueryListListener: this.listener(DeviceType.tablet)
      },
      {
        device: DeviceType.mobile,
        mediaQueryList: this.windowService
          .getWindow()
          .matchMedia(MediaQuery.Mobile),
        mediaQueryListListener: this.listener(DeviceType.mobile)
      }
    ];

    this.mediaQueries.forEach(
      ({ mediaQueryList, device, mediaQueryListListener }) => {
        if (mediaQueryList.matches) {
          this.emit(device);
        }
        if (mediaQueryList.addListener) {
          mediaQueryList.addListener(mediaQueryListListener);
        }
      }
    );
  }

  private listener(device: DeviceType) {
    return (event: MediaQueryListEvent) => {
      if (event.matches) {
        this.emit(device);
      }
    };
  }

  private emit(device: DeviceType) {
    if (device !== this.breakpointObserver.getValue()) {
      this.breakpointObserver.next(device);
    }
  }

  subscribe(subscriber: (device: DeviceType) => void) {
    return this.breakpointObserver.subscribe(subscriber);
  }

  ngOnDestroy(): void {
    this.mediaQueries.forEach(({ mediaQueryList, mediaQueryListListener }) => {
      if (mediaQueryList.removeListener) {
        mediaQueryList.removeListener(mediaQueryListListener);
      }
    });
  }
}

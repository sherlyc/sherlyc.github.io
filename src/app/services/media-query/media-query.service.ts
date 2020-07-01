import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DeviceType } from "../../../../common/DeviceType";
import { RuntimeService } from "../runtime/runtime.service";

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

  constructor(private runtimeService: RuntimeService) {
    this.init();
  }

  init() {
    if (this.runtimeService.isServer()) {
      return;
    }
    this.mediaQueries = [
      {
        device: DeviceType.desktop,
        mediaQueryList: window.matchMedia(MediaQuery.Desktop),
        mediaQueryListListener: this.listener(DeviceType.desktop)
      },
      {
        device: DeviceType.tablet,
        mediaQueryList: window.matchMedia(MediaQuery.Tablet),
        mediaQueryListListener: this.listener(DeviceType.tablet)
      },
      {
        device: DeviceType.mobile,
        mediaQueryList: window.matchMedia(MediaQuery.Mobile),
        mediaQueryListListener: this.listener(DeviceType.mobile)
      }
    ];

    this.mediaQueries.forEach(
      ({ mediaQueryList, device, mediaQueryListListener }) => {
        if (mediaQueryList.matches) {
          this.emit(device);
        }
        mediaQueryList.addEventListener<"change">(
          "change",
          mediaQueryListListener
        );
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
    this.breakpointObserver.subscribe(subscriber);
  }

  ngOnDestroy(): void {
    this.mediaQueries.forEach((entry) => {
      entry!.mediaQueryList.removeEventListener<"change">(
        "change",
        entry!.mediaQueryListListener
      );
    });
  }
}

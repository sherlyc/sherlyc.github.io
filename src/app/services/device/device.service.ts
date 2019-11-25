import { Injectable } from '@angular/core';
import { WindowService } from '../window/window.service';
import { parse } from 'bowser';
import { DeviceType } from '../../../../common/DeviceType';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private windowService: WindowService) {}

  getDevice() {
    return (
      (parse(this.windowService.getWindow().navigator.userAgent).platform
        .type as DeviceType) || DeviceType.unknown
    );
  }
}

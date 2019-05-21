import { Injectable } from '@angular/core';
import { WindowService } from '../window/window.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserOverrideService {
  constructor(private windowService: WindowService) {}
  setup() {
    const window = this.windowService.getWindow();
    window.alert = () => {};
    window.confirm = () => false;
  }
}

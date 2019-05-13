import { Injectable } from '@angular/core';
import { IDigitalData } from '../data-layer/__types__/IDigitalData';
import { IWindowService } from './__types__/IWindowService';
import { IWindow } from './__types__/IWindow';

declare const window: Window & {
  digitalData: IDigitalData;
  _satellite: {
    pageBottom: () => void;
  };
};

@Injectable({
  providedIn: 'root'
})
export class WindowService implements IWindowService {
  constructor() {}

  getWindow() {
    return window;
  }
}

@Injectable()
export class ServerWindowService implements IWindowService {
  constructor() {}

  getWindow() {
    return {} as Window & IWindow;
  }
}

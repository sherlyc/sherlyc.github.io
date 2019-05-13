import { Injectable } from '@angular/core';
import { IWindowService } from './__types__/IWindowService';
import { IWindow } from './__types__/IWindow';
import { IDigitalData } from '../analytics/__types__/IDigitalData';

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

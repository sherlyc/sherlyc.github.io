import { Injectable } from "@angular/core";
import { IWindowService } from "./__types__/IWindowService";
import { IWindow } from "./__types__/IWindow";

declare const window: Window & IWindow;

@Injectable({
  providedIn: "root"
})
export class WindowService implements IWindowService {
  getWindow() {
    return window;
  }
}

@Injectable()
export class ServerWindowService implements IWindowService {
  window = {};
  getWindow() {
    return this.window as Window & IWindow;
  }
}

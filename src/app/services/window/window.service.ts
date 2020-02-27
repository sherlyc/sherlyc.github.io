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

  isDesktopDomain(): boolean {
    return this.getWindow().location.hostname.includes("www");
  }
}

@Injectable()
export class ServerWindowService implements IWindowService {
  window = {};
  getWindow() {
    return this.window as Window & IWindow;
  }

  isDesktopDomain(): boolean {
    throw new Error("isDesktopDomain should never be invoked on server side");
  }
}

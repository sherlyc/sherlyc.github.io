import { Injectable } from "@angular/core";
import { parse } from "bowser";
import { DeviceType } from "../../../../common/DeviceType";
import { RuntimeService } from "../runtime/runtime.service";
import { WindowService } from "../window/window.service";

@Injectable({
  providedIn: "root"
})
export class DeviceService {
  private _isGridSupported!: boolean;

  constructor(
    private runtimeService: RuntimeService,
    private windowService: WindowService
  ) {}

  getDevice() {
    return (
      (parse(this.windowService.getWindow().navigator.userAgent).platform
        .type as DeviceType) || DeviceType.unknown
    );
  }

  isGridSupported() {
    if (this.runtimeService.isBrowser()) {
      if (typeof this._isGridSupported === "undefined") {
        const { style } = document.createElement("div");
        this._isGridSupported = ["gridTemplateColumns", "msGridColumns"].some(
          (key) => key in style
        );
      }
      return this._isGridSupported;
    } else {
      return true;
    }
  }
}

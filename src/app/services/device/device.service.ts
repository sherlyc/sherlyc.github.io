import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { parse } from "bowser";
import { DeviceType } from "../../../../common/DeviceType";
import { WindowService } from "../window/window.service";

@Injectable({
  providedIn: "root"
})
export class DeviceService {
  private isGridSupportedMemo!: boolean;

  constructor(
    private windowService: WindowService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  getDevice() {
    return (
      (parse(this.windowService.getWindow().navigator.userAgent).platform
        .type as DeviceType) || DeviceType.unknown
    );
  }

  isGridSupported() {
    if (typeof this.isGridSupportedMemo === "undefined") {
      const { style } = this.document.createElement("div");
      this.isGridSupportedMemo = ["gridTemplateColumns", "msGridColumns"].some(
        (key) => key in style
      );
    }
    return this.isGridSupportedMemo;
  }
}

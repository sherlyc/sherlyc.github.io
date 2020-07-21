import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { APP_ID, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import * as cxs from "cxs";

@Injectable({
  providedIn: "root"
})
export class GlobalStyleService {
  private readonly prefix: string;
  private readonly styleId: string;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(APP_ID) private appId: string,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.prefix = isPlatformBrowser(this.platformId)
      ? "spade_"
      : "spade_server_";
    this.styleId = `${this.appId}-global-style`;
    this.detachStyle();
    cxs.prefix(this.prefix);
  }

  public stylePrefix(): string {
    return this.prefix;
  }

  public injectStyle(...args: any[]) {
    return cxs(...args);
  }

  public attachStyle(): void {
    const style = this.doc.createElement("style");
    style.id = this.styleId;
    style.textContent = cxs.css();
    this.doc.head.appendChild(style);
  }

  public detachStyle(): void {
    const style = this.doc.getElementById(this.styleId);
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }
  }
}

import { DOCUMENT } from "@angular/common";
import { APP_ID, NgModule } from "@angular/core";
import { BEFORE_APP_SERIALIZED } from "@angular/platform-server";
import { GlobalStyleService } from "./services/global-style/global-style.service";

@NgModule({
  providers: [
    {
      provide: GlobalStyleService,
      useFactory: (doc: Document, appId: string): GlobalStyleService => {
        const styleEl = doc.getElementById(`${appId}-global-style`);
        if (styleEl) {
          (styleEl.parentNode as HTMLElement).removeChild(styleEl);
        }
        return new GlobalStyleService();
      },
      deps: [DOCUMENT, APP_ID]
    }
  ]
})
export class GlobalStyleModule {}

@NgModule({
  providers: [
    GlobalStyleService,
    {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: (
        doc: Document,
        appId: string,
        globalStyleService: GlobalStyleService
      ): Function => () => {
        const script = doc.createElement("style");
        script.id = `${appId}-global-style`;
        script.textContent = globalStyleService.getStyles();
        doc.head.appendChild(script);
      },
      deps: [DOCUMENT, APP_ID, GlobalStyleService],
      multi: true
    }
  ]
})
export class ServerGlobalStyleModule {}

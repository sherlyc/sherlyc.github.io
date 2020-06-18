/* istanbul ignore file */
import { NgModule } from "@angular/core";
import {
  BEFORE_APP_SERIALIZED,
  ServerModule,
  ServerTransferStateModule
} from "@angular/platform-server";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { CookieService } from "./services/cookie/cookie.service";
import { ServerCookieService } from "./services/cookie/server-cookie.service";
import { GlobalStyleService } from "./services/global-style/global-style.service";
import { ServerStoreService } from "./services/store/server-store.service";
import { StoreService } from "./services/store/store.service";
import {
  ServerWindowService,
  WindowService
} from "./services/window/window.service";

@NgModule({
  imports: [ServerTransferStateModule, AppModule, ServerModule],
  providers: [
    // Add universal-only providers here
    { provide: CookieService, useClass: ServerCookieService },
    { provide: StoreService, useClass: ServerStoreService },
    { provide: WindowService, useClass: ServerWindowService },
    {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: (globalStyleService: GlobalStyleService) => () =>
        globalStyleService.attachStyle(),
      deps: [GlobalStyleService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}

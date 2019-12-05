/* istanbul ignore file */
import { NgModule } from "@angular/core";
import {
  ServerModule,
  ServerTransferStateModule
} from "@angular/platform-server";
import { ModuleMapLoaderModule } from "@nguniversal/module-map-ngfactory-loader";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { ServerGlobalStyleModule } from "./global-style.module";
import { CookieService } from "./services/cookie/cookie.service";
import { ServerCookieService } from "./services/cookie/server-cookie.service";
import { ServerStoreService } from "./services/store/server-store.service";
import { StoreService } from "./services/store/store.service";
import {
  ServerWindowService,
  WindowService
} from "./services/window/window.service";

@NgModule({
  imports: [
    ServerTransferStateModule,
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerGlobalStyleModule
  ],
  providers: [
    // Add universal-only providers here
    { provide: CookieService, useClass: ServerCookieService },
    { provide: StoreService, useClass: ServerStoreService },
    { provide: WindowService, useClass: ServerWindowService }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}

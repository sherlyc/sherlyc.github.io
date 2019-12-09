/* istanbul ignore file */
import { DOCUMENT } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { APP_ID, ErrorHandler, NgModule, PLATFORM_ID } from "@angular/core";
import {
  BrowserModule,
  BrowserTransferStateModule
} from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { ContentBlocksModule } from "./content-blocks/content-blocks.module";
import { AppRoutingModule } from "./routing/app-routing.module";
import { CookieService } from "./services/cookie/cookie.service";
import { GlobalStyleService } from "./services/global-style/global-style.service";
import { HttpInterceptorService } from "./services/http-interceptor/http-interceptor.service";
import { LoggerService } from "./services/logger/logger.service";
import { WindowService } from "./services/window/window.service";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "stuff-experience-frontend" }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    SharedModule,
    ContentBlocksModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    { provide: ErrorHandler, useClass: LoggerService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    CookieService,
    WindowService,
    GlobalStyleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

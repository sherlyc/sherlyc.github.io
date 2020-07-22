/* istanbul ignore file */
import { registerLocaleData } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import enNZ from "@angular/common/locales/en-NZ";
import { ErrorHandler, LOCALE_ID, NgModule } from "@angular/core";
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
import { HttpInterceptorService } from "./services/http-interceptor/http-interceptor.service";
import { LoggerService } from "./services/logger/logger.service";
import { WindowService } from "./services/window/window.service";
import { SharedModule } from "./shared/shared.module";

registerLocaleData(enNZ, "en-NZ");

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
      enabled: environment.production,
      registrationStrategy: "registerImmediately"
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en-NZ" },
    { provide: ErrorHandler, useClass: LoggerService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    CookieService,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

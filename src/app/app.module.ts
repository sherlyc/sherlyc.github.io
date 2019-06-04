import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { LoggerService } from './services/logger/logger.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpInterceptorService } from './services/http-interceptor/http-interceptor.service';
import { CookieService } from './services/cookie/cookie.service';
import { SharedModule } from './shared/shared.module';
import { WindowService } from './services/window/window.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'stuff-experience-frontend' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    SharedModule,
    ContentBlocksModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
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
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

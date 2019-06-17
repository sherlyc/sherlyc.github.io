import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { LoggerService } from './services/logger/logger.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CookieService } from './services/cookie/cookie.service';
import { SharedModule } from './shared/shared.module';
import { WindowService } from './services/window/window.service';
import { MetaModule } from '@ngx-meta/core';

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
    }),
    MetaModule.forRoot()
  ],
  providers: [
    { provide: ErrorHandler, useClass: LoggerService },
    CookieService,
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

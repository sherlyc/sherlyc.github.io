import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieService } from './services/cookie/cookie.service';
import { ServerCookieService } from './services/cookie/server-cookie.service';
import { StoreService } from './services/store/store.service';
import { ServerStoreService } from './services/store/server-store.service';

@NgModule({
  imports: [
    ServerTransferStateModule,
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  providers: [
    // Add universal-only providers here
    { provide: CookieService, useClass: ServerCookieService },
    { provide: StoreService, useClass: ServerStoreService }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}

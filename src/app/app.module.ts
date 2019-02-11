import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StuffCustomMaterialModule } from './shared/stuff-custom-material/stuff-custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageComponent } from './modules/page/page.component';

import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

import * as Sentry from '@sentry/browser';
import { SharedModule } from './shared/shared.module';
import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { BasicArticleUnitComponent } from './content-blocks/basic-article-unit/basic-article-unit.component';
import { TimeAgoPipe } from 'time-ago-pipe';

Sentry.init({
  // dsn: 'https://30f2a44af0d04b55875db5eb17b68a63@sentry.io/1306325'
  dsn: 'https://48f99cea317a4f9d9c015be25e9943f2@sentry.io/1308464'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error: any) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    PageNotFoundComponent,
    BasicArticleUnitComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'stuff-experience-frontend' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    StuffCustomMaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ContentBlocksModule
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {}

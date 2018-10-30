import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StuffCustomMaterialModule } from './stuff-custom-material/stuff-custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { AuthoringComponent } from './authoring/authoring.component';
import { HomeComponent } from './home/home.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import * as Sentry from '@sentry/browser';

Sentry.init({
  // dsn: 'https://30f2a44af0d04b55875db5eb17b68a63@sentry.io/1306325'
  dsn: 'https://48f99cea317a4f9d9c015be25e9943f2@sentry.io/1308464'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthoringComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'stuff-ref-frontend-architecture' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    StuffCustomMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }

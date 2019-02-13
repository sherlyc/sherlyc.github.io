import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageComponent } from './modules/page/page.component';
import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { LoggerService } from './services/logger/logger.service';

@NgModule({
  declarations: [AppComponent, PageComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'stuff-experience-frontend' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ContentBlocksModule
  ],
  providers: [{ provide: ErrorHandler, useClass: LoggerService }],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StuffCustomMaterialModule } from './shared/stuff-custom-material/stuff-custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageComponent } from './modules/page/page.component';

import { SharedModule } from './shared/shared.module';
import { ContentBlocksModule } from './content-blocks/content-blocks.module';
import { LoggerService } from './services/logger.service';

@NgModule({
  declarations: [AppComponent, PageComponent],
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
  providers: [{ provide: ErrorHandler, useClass: LoggerService }],
  bootstrap: [AppComponent]
})
export class AppModule {}

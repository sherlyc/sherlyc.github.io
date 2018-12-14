import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorBarComponent } from './color-bar/color-bar.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ColorBarComponent,
    LogoComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    ColorBarComponent,
    LogoComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }

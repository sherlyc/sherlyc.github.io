import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorBarComponent } from './color-bar/color-bar.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ColorBarComponent,
    LogoComponent,
    HeaderComponent
  ],
  exports: [
    ColorBarComponent,
    LogoComponent,
    HeaderComponent
  ]
})
export class SharedModule { }

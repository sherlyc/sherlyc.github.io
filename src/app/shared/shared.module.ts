import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorBarComponent } from './color-bar/color-bar.component';
import {IconComponent} from './icon/icon.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ColorBarComponent,
    IconComponent,
    HeaderComponent
  ],
  exports: [
    ColorBarComponent,
    IconComponent,
    HeaderComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorBarComponent } from './color-bar/color-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ColorBarComponent
  ],
  exports: [
    ColorBarComponent
  ]
})
export class SharedModule { }

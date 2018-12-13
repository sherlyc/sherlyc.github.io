import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorBarComponent } from './color-bar.component';

@NgModule({
  declarations: [ColorBarComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ColorBarComponent
  ]
})
export class ColorBarModule { }

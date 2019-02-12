import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorBarComponent } from './color-bar/color-bar.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ColorBarComponent, LogoComponent],
  exports: [ColorBarComponent, LogoComponent]
})
export class SharedModule {}

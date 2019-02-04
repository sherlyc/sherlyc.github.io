import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentBlockComponent } from './content-block/content-block.component';

@NgModule({
  declarations: [ContentBlockComponent],
  imports: [CommonModule],
  exports: [ContentBlockComponent]
})
export class ContentBlocksModule {}

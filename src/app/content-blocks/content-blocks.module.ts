import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentBlockComponent } from './content-block/content-block.component';
import { contentBlockComponents } from './content-blocks.registry';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [ContentBlockComponent, ...contentBlockComponents],
  imports: [CommonModule, MomentModule],
  exports: [ContentBlockComponent],
  entryComponents: contentBlockComponents
})
export class ContentBlocksModule {}

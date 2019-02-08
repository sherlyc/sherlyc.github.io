import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ContentBlockComponent } from './content-block/content-block.component';
import { contentBlockComponents } from './content-blocks.registry';

@NgModule({
  declarations: [TimeAgoPipe, ContentBlockComponent, ...contentBlockComponents],
  imports: [CommonModule],
  exports: [ContentBlockComponent],
  entryComponents: contentBlockComponents
})
export class ContentBlocksModule {}

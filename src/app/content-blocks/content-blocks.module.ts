import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { contentBlockComponents } from './content-blocks.registry';
import { MomentModule } from 'ngx-moment';
import { ContentBlockDirective } from './content-block/content-block.directive';
import { StickyHideDirective } from '../directives/hide-header.directive';

@NgModule({
  declarations: [
    ...contentBlockComponents,
    StickyHideDirective,
    ContentBlockDirective
  ],
  imports: [CommonModule, MomentModule],
  exports: [ContentBlockDirective],
  entryComponents: contentBlockComponents
})
export class ContentBlocksModule {}

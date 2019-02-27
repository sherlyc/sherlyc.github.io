import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { contentBlockComponents } from './content-blocks.registry';
import { MomentModule } from 'ngx-moment';
import { ContentBlockDirective } from '../directives/content-block/content-block.directive';
import { HideHeaderDirective } from '../directives/hide-header/hide-header.directive';
import { ContentBlockListComponent } from './content-block-list/content-block-list.component';

@NgModule({
  declarations: [
    ...contentBlockComponents,
    HideHeaderDirective,
    ContentBlockDirective,
    ContentBlockListComponent
  ],
  imports: [CommonModule, MomentModule],
  exports: [ContentBlockDirective, ContentBlockListComponent],
  entryComponents: contentBlockComponents
})
export class ContentBlocksModule {}

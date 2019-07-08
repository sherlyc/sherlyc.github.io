import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { contentBlockComponents } from './content-blocks.registry';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: contentBlockComponents,
  entryComponents: contentBlockComponents
})
export class ContentBlocksModule {}

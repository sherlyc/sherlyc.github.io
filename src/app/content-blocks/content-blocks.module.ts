import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { contentBlockComponents } from './content-blocks.registry';
import { MomentModule } from 'ngx-moment';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, MomentModule, SharedModule],
  declarations: contentBlockComponents,
  entryComponents: contentBlockComponents
})
export class ContentBlocksModule {}

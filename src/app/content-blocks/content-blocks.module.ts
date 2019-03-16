import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { contentBlockComponents } from './content-blocks.registry';
import { MomentModule } from 'ngx-moment';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [...contentBlockComponents],
  imports: [CommonModule, MomentModule, SharedModule],
  entryComponents: contentBlockComponents
})
export class ContentBlocksModule {}

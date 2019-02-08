import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ContentBlockComponent } from './content-block/content-block.component';
import { BasicArticleUnitComponent } from './basic-article-unit/basic-article-unit.component';
import { ErrorBlockComponent } from './error-block/error-block.component';

const contentBlockComponents = [BasicArticleUnitComponent, ErrorBlockComponent];

@NgModule({
  declarations: [TimeAgoPipe, ContentBlockComponent, ...contentBlockComponents],
  imports: [CommonModule],
  exports: [ContentBlockComponent],
  entryComponents: contentBlockComponents
})
export class ContentBlocksModule {}

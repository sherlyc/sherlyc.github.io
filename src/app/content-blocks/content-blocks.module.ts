import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ContentBlockComponent } from './content-block/content-block.component';
import { BasicArticleUnitComponent } from './basic-article-unit/basic-article-unit.component';
import registry from './content-blocks-registry';
import { ErrorBlockComponent } from './error-block/error-block.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
    ContentBlockComponent,
    BasicArticleUnitComponent,
    ErrorBlockComponent
  ],
  imports: [CommonModule],
  exports: [ContentBlockComponent],
  entryComponents: [Object.values(registry)]
})
export class ContentBlocksModule {}

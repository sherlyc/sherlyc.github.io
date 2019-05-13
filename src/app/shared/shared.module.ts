import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './directives/hide-header/hide-header.directive';
import { ContentBlockDirective } from './directives/content-block/content-block.directive';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { PageComponent } from './components/page/page.component';
import { HeadlineComponent } from '../content-blocks/headline/headline.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PageComponent,
    HideHeaderDirective,
    ContentBlockDirective,
    CopyrightComponent,
    HeadlineComponent
  ],
  exports: [
    PageComponent,
    HideHeaderDirective,
    ContentBlockDirective,
    CopyrightComponent,
    HeadlineComponent
  ]
})
export class SharedModule {}

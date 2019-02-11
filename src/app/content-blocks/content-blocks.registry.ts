import { Type } from '@angular/core';
import { BasicArticleUnitComponent } from './basic-article-unit/basic-article-unit.component';
import { ErrorBlockComponent } from './error-block/error-block.component';
import { IContentBlockComponent } from './__types__/IContentBlockComponent';

export const contentBlockComponents = [
  BasicArticleUnitComponent,
  ErrorBlockComponent
];

const registry: { [key: string]: Type<IContentBlockComponent> } = {
  BasicArticleUnitComponent,
  ErrorBlockComponent
};

export default registry;

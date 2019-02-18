import { Type } from '@angular/core';
import { BasicArticleUnitComponent } from './basic-article-unit/basic-article-unit.component';
import { ErrorBlockComponent } from './error-block/error-block.component';
import { IContentBlockComponent } from './__types__/IContentBlockComponent';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BasicAdUnitComponent } from './basic-ad-unit/basic-ad-unit.component';

export const contentBlockComponents = [
  BasicArticleUnitComponent,
  BasicAdUnitComponent,
  ContainerComponent,
  ErrorBlockComponent,
  HeaderComponent,
  FooterComponent
];

const registry: { [key: string]: Type<IContentBlockComponent> } = {
  BasicArticleUnitComponent,
  BasicAdUnitComponent,
  ContainerComponent,
  ErrorBlockComponent,
  HeaderComponent,
  FooterComponent
};

export default registry;
import { Type } from '@angular/core';
import { BasicArticleUnitComponent } from './basic-article-unit/basic-article-unit.component';
import { ErrorBlockComponent } from './error-block/error-block.component';
import { IContentBlockComponent } from './__types__/IContentBlockComponent';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BasicAdUnitComponent } from './basic-ad-unit/basic-ad-unit.component';
import { BasicArticleSectionComponent } from './basic-article-section/basic-article-section.component';
import { BreakingNewsComponent } from './breaking-news/breaking-news.component';
import { ImageLinkUnitComponent } from './image-link-unit/image-link-unit.component';
import { ColumnContainerComponent } from './column-container/column-container.component';
import { ExternalContentUnitComponent } from './external-content-unit/external-content-unit.component';
import { WeatherUnitComponent } from './weather-unit/weather-unit.component';

export const contentBlockComponents = [
  BasicArticleUnitComponent,
  BasicArticleSectionComponent,
  ImageLinkUnitComponent,
  BasicAdUnitComponent,
  BreakingNewsComponent,
  ContainerComponent,
  ColumnContainerComponent,
  ErrorBlockComponent,
  HeaderComponent,
  ExternalContentUnitComponent,
  WeatherUnitComponent,
  FooterComponent
];

const registry: {
  [key: string]: Type<IContentBlockComponent>;
} = {
  BasicArticleUnitComponent,
  BasicArticleSectionComponent,
  ImageLinkUnitComponent,
  BasicAdUnitComponent,
  BreakingNewsComponent,
  ContainerComponent,
  ColumnContainerComponent,
  ErrorBlockComponent,
  HeaderComponent,
  ExternalContentUnitComponent,
  WeatherUnitComponent,
  FooterComponent
};

export default registry;

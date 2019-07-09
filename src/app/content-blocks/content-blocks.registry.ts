import { VideoUnitComponent } from './video-unit/video-unit.component';
import { Type } from '@angular/core';
import { DefconArticleUnitComponent } from './defcon-article-unit/defcon-article-unit.component';
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
import { BasicArticleTitleUnitComponent } from './basic-article-title-unit/basic-article-title-unit.component';
import { ExperimentContainerComponent } from './experiment-container/experiment-container.component';

export const contentBlockComponents = [
  DefconArticleUnitComponent,
  BasicArticleUnitComponent,
  BasicArticleSectionComponent,
  BasicArticleTitleUnitComponent,
  ImageLinkUnitComponent,
  BasicAdUnitComponent,
  BreakingNewsComponent,
  ContainerComponent,
  ColumnContainerComponent,
  ErrorBlockComponent,
  HeaderComponent,
  ExternalContentUnitComponent,
  WeatherUnitComponent,
  VideoUnitComponent,
  ExperimentContainerComponent,
  FooterComponent
];

const registry: {
  [key: string]: Type<IContentBlockComponent>;
} = {
  DefconArticleUnitComponent,
  BasicArticleUnitComponent,
  BasicArticleSectionComponent,
  BasicArticleTitleUnitComponent,
  ImageLinkUnitComponent,
  BasicAdUnitComponent,
  BreakingNewsComponent,
  ContainerComponent,
  ColumnContainerComponent,
  ErrorBlockComponent,
  HeaderComponent,
  ExternalContentUnitComponent,
  WeatherUnitComponent,
  VideoUnitComponent,
  ExperimentContainerComponent,
  FooterComponent
};

export default registry;

import { Type } from "@angular/core";
import { IContentBlockComponent } from "./__types__/IContentBlockComponent";
import { BasicAdUnitComponent } from "./basic-ad-unit/basic-ad-unit.component";
import { BasicArticleSectionComponent } from "./basic-article-section/basic-article-section.component";
import { BasicArticleTitleUnitComponent } from "./basic-article-title-unit/basic-article-title-unit.component";
import { BasicArticleUnitComponent } from "./basic-article-unit/basic-article-unit.component";
import { BigImageArticleUnitComponent } from "./big-image-article-unit/big-image-article-unit.component";
import { BreakingNewsComponent } from "./breaking-news/breaking-news.component";
import { ColumnContainerComponent } from "./column-container/column-container.component";
import { ContainerComponent } from "./container/container.component";
import { DefconArticleUnitComponent } from "./defcon-article-unit/defcon-article-unit.component";
import { ErrorBlockComponent } from "./error-block/error-block.component";
import { ExpandableArticleSectionComponent } from "./expandable-article-section/expandable-article-section.component";
import { ExperimentContainerComponent } from "./experiment-container/experiment-container.component";
import { ExternalContentUnitComponent } from "./external-content-unit/external-content-unit.component";
import { FeatureContainerComponent } from "./feature-container/feature-container.component";
import { FeaturedArticleComponent } from "./featured-article/featured-article.component";
import { FooterComponent } from "./footer/footer.component";
import { GrayDefconArticleUnitComponent } from "./gray-defcon-article-unit/gray-defcon-article-unit.component";
import { GridContainerComponent } from "./grid-container/grid-container.component";
import { HalfImageArticleWithoutIntroUnitComponent } from "./half-image-article-without-intro-unit/half-image-article-without-intro-unit.component";
import { HalfWidthImageArticleUnitComponent } from "./half-width-image-article-unit/half-width-image-article-unit.component";
import { HeaderComponent } from "./header/header.component";
import { ImageLinkUnitComponent } from "./image-link-unit/image-link-unit.component";
import { ModuleTitleComponent } from "./module-title/module-title.component";
import { ModuleSubtitleComponent } from "./module-subtitle/module-subtitle.component";
import { RecommendationsComponent } from "./recommendations/recommendations.component";
import { ResponsiveBigImageArticleComponent } from "./responsive-big-image-article/responsive-big-image-article.component";
import { WeatherUnitComponent } from "./weather-unit/weather-unit.component";
import { StickyContainerComponent } from "./sticky-container/sticky-container.component";
import { BulletListComponent } from "./bullet-list/bullet-list.component";
import { ResponsiveExternalContentComponent } from "./responsive-external-content/responsive-external-content.component";

export const contentBlockComponents = [
  GrayDefconArticleUnitComponent,
  DefconArticleUnitComponent,
  BasicArticleUnitComponent,
  BigImageArticleUnitComponent,
  HalfWidthImageArticleUnitComponent,
  BasicArticleSectionComponent,
  ExpandableArticleSectionComponent,
  BasicArticleTitleUnitComponent,
  ImageLinkUnitComponent,
  HalfImageArticleWithoutIntroUnitComponent,
  BasicAdUnitComponent,
  BreakingNewsComponent,
  ContainerComponent,
  ColumnContainerComponent,
  ErrorBlockComponent,
  HeaderComponent,
  ExternalContentUnitComponent,
  WeatherUnitComponent,
  ExperimentContainerComponent,
  FeatureContainerComponent,
  FooterComponent,
  RecommendationsComponent,
  GridContainerComponent,
  ResponsiveBigImageArticleComponent,
  ModuleTitleComponent,
  ModuleSubtitleComponent,
  FeaturedArticleComponent,
  StickyContainerComponent,
  BulletListComponent,
  ResponsiveExternalContentComponent
];

const registry: {
  [key: string]: Type<IContentBlockComponent>;
} = {
  GrayDefconArticleUnitComponent,
  DefconArticleUnitComponent,
  BasicArticleUnitComponent,
  BigImageArticleUnitComponent,
  HalfWidthImageArticleUnitComponent,
  BasicArticleSectionComponent,
  ExpandableArticleSectionComponent,
  BasicArticleTitleUnitComponent,
  ImageLinkUnitComponent,
  HalfImageArticleWithoutIntroUnitComponent,
  BasicAdUnitComponent,
  BreakingNewsComponent,
  ContainerComponent,
  ColumnContainerComponent,
  ErrorBlockComponent,
  HeaderComponent,
  ExternalContentUnitComponent,
  WeatherUnitComponent,
  ExperimentContainerComponent,
  FeatureContainerComponent,
  FooterComponent,
  RecommendationsComponent,
  GridContainerComponent,
  ResponsiveBigImageArticleComponent,
  ModuleTitleComponent,
  ModuleSubtitleComponent,
  FeaturedArticleComponent,
  StickyContainerComponent,
  BulletListComponent,
  ResponsiveExternalContentComponent
};

export default registry;

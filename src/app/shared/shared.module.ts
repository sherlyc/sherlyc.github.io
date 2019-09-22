import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './directives/hide-header/hide-header.directive';
import { ContentBlockDirective } from './directives/content-block/content-block.directive';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { PageComponent } from './components/page/page.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { OpenExternalLinkDirective } from './directives/open-external-link/open-external-link.directive';
import { SigninCallbackComponent } from './components/authentication/signin-callback.component';
import { HeadlineFlagComponent } from './components/headline-flag/headline-flag.component';
import { TimeAgoComponent } from './components/time-ago/time-ago.component';
import { WeatherIconComponent } from './components/weather-icon/weather-icon.component';
import { ResizeDirective } from './directives/resize/resize.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PageComponent,
    HideHeaderDirective,
    ResizeDirective,
    ContentBlockDirective,
    OpenExternalLinkDirective,
    CopyrightComponent,
    HeadlineComponent,
    SigninCallbackComponent,
    HeadlineFlagComponent,
    WeatherIconComponent,
    TimeAgoComponent
  ],
  exports: [
    PageComponent,
    HideHeaderDirective,
    ResizeDirective,
    ContentBlockDirective,
    OpenExternalLinkDirective,
    CopyrightComponent,
    HeadlineComponent,
    SigninCallbackComponent,
    HeadlineFlagComponent,
    WeatherIconComponent,
    TimeAgoComponent
  ]
})
export class SharedModule {}

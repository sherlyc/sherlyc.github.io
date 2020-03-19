import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SigninCallbackComponent } from "./components/authentication/signin-callback.component";
import { CopyrightComponent } from "./components/copyright/copyright.component";
import { FluidImageComponent } from "./components/fluid-image/fluid-image.component";
import { HeadlineFlagComponent } from "./components/headline-flag/headline-flag.component";
import { HeadlineComponent } from "./components/headline/headline.component";
import { LogoComponent } from "./components/logo/logo.component";
import { PageComponent } from "./components/page/page.component";
import { TimeAgoComponent } from "./components/time-ago/time-ago.component";
import { WeatherIconComponent } from "./components/weather-icon/weather-icon.component";
import { ContentBlockDirective } from "./directives/content-block/content-block.directive";
import { GlobalStyleDirective } from "./directives/global-style/global-style.directive";
import { HideHeaderDirective } from "./directives/hide-header/hide-header.directive";
import { IntersectionObserverDirective } from "./directives/intersection-observer/intersection-observer.directive";
import { OpenExternalLinkDirective } from "./directives/open-external-link/open-external-link.directive";
import { ResizeDirective } from "./directives/resize/resize.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [
    PageComponent,
    HideHeaderDirective,
    ResizeDirective,
    ContentBlockDirective,
    OpenExternalLinkDirective,
    GlobalStyleDirective,
    IntersectionObserverDirective,
    CopyrightComponent,
    HeadlineComponent,
    SigninCallbackComponent,
    HeadlineFlagComponent,
    WeatherIconComponent,
    TimeAgoComponent,
    FluidImageComponent,
    LogoComponent
  ],
  exports: [
    PageComponent,
    HideHeaderDirective,
    ResizeDirective,
    ContentBlockDirective,
    OpenExternalLinkDirective,
    GlobalStyleDirective,
    IntersectionObserverDirective,
    CopyrightComponent,
    HeadlineComponent,
    SigninCallbackComponent,
    HeadlineFlagComponent,
    WeatherIconComponent,
    TimeAgoComponent,
    FluidImageComponent,
    LogoComponent
  ]
})
export class SharedModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HideHeaderDirective } from "./directives/hide-header/hide-header.directive";
import { ContentBlockDirective } from "./directives/content-block/content-block.directive";
import { CopyrightComponent } from "./components/copyright/copyright.component";
import { PageComponent } from "./components/page/page.component";
import { HeadlineComponent } from "./components/headline/headline.component";
import { OpenExternalLinkDirective } from "./directives/open-external-link/open-external-link.directive";
import { SigninCallbackComponent } from "./components/authentication/signin-callback.component";
import { HeadlineFlagComponent } from "./components/headline-flag/headline-flag.component";
import { TimeAgoComponent } from "./components/time-ago/time-ago.component";
import { WeatherIconComponent } from "./components/weather-icon/weather-icon.component";
import { ResizeDirective } from "./directives/resize/resize.directive";
import { GlobalStyleDirective } from "./directives/global-style/global-style.directive";
import { FluidImageComponent } from "./components/fluid-image/fluid-image.component";
import { LogoComponent } from "./components/logo/logo.component";
import { IntersectionObserverDirective } from "./directives/intersection-observer/intersection-observer.directive";

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

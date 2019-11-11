import { Component } from '@angular/core';
import { AdService } from './services/ad/ad.service';
import { EventsService } from './services/events/events.service';
import { DtmService } from './services/dtm/dtm.service';
import { AnalyticsService } from './services/analytics/analytics.service';
import { BrowserOverrideService } from './services/browser-override/browser-override.service';
import { ExperimentService } from './services/experiment/experiment.service';
import { NeighbourlyService } from './services/neighbourly/neighbourly.service';
import { MetaTagsService } from './services/meta-tags/meta-tags.service';
import { FeatureSwitchService } from './services/feature-switch/feature-switch.service';
import { PwaService } from './services/pwa/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private experimentService: ExperimentService,
    private adService: AdService,
    private eventsService: EventsService,
    private analyticsService: AnalyticsService,
    private dtm: DtmService,
    private browserOverride: BrowserOverrideService,
    private neighbourlyService: NeighbourlyService,
    private metaTagsService: MetaTagsService,
    private featureSwitchService: FeatureSwitchService,
    private pwaService: PwaService
  ) {
    this.experimentService.setup();
    this.featureSwitchService.setup();
    this.analyticsService.setup();
    this.adService.setup();
    this.eventsService.setup();
    this.dtm.setup();
    this.browserOverride.setup();
    this.neighbourlyService.setup();
    this.metaTagsService.setup();
    this.pwaService.setup();
  }
}

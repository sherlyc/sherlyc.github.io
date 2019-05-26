import { Component } from '@angular/core';
import { AdService } from './services/ad/ad.service';
import { EventsService } from './services/events/events.service';
import { DtmService } from './services/dtm/dtm.service';
import { AnalyticsService } from './services/analytics/analytics.service';
import { BrowserOverrideService } from './services/browser-override/browser-override.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private adService: AdService,
    private eventsService: EventsService,
    private analyticsService: AnalyticsService,
    private dtm: DtmService,
    private browserOverride: BrowserOverrideService
  ) {
    this.adService.setup();
    this.eventsService.setup();
    this.analyticsService.setup();
    this.dtm.setup();
    this.browserOverride.setup();
  }
}

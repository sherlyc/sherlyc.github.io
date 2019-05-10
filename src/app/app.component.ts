import { Component } from '@angular/core';
import { AdService } from './services/ad/ad.service';
import { EventsService } from './services/events/events.service';
import { DtmService } from './services/dtm/dtm.service';
import { AnalyticsService } from './services/data-layer/analytics.service';

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
    private dtm: DtmService
  ) {
    this.adService.setupAds();
    this.eventsService.setup();
    this.analyticsService.setup();
    this.dtm.setup();
  }
}

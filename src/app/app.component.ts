import { Component } from '@angular/core';
import { AdService } from './services/ad/ad.service';
import { EventsService } from './services/events/events.service';
import { DtmService } from './services/dtm/dtm.service';
import { DataLayerService } from './services/data-layer/data-layer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private adService: AdService,
    private eventsService: EventsService,
    private dataLayerService: DataLayerService,
    private dtm: DtmService
  ) {
    this.adService.setupAds();
    this.eventsService.setup();
    this.dataLayerService.setup();
    this.dtm.setup();
  }
}

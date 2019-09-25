import { Component, OnInit } from '@angular/core';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import { IPage } from '../../../../../common/__types__/IPage';
import { Title } from '@angular/platform-browser';
import { ContentRetrieverService } from '../../../services/content-retriever/content-retriever.service';
import { AdService } from '../../../services/ad/ad.service';
import { CorrelationService } from '../../../services/correlation/correlation.service';
import { EventsService } from '../../../services/events/events.service';
import { Subject } from 'rxjs';
import { NavigationStart } from '@angular/router';
import { AnalyticsService } from '../../../services/analytics/analytics.service';
import { environment } from '../../../../environments/environment';
import { LoggerService } from '../../../services/logger/logger.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  private navigationStartSubject: Subject<NavigationStart>;
  constructor(
    private contentRetriever: ContentRetrieverService,
    private adService: AdService,
    private title: Title,
    private correlationService: CorrelationService,
    private eventsService: EventsService,
    private loggerService: LoggerService,
    private analyticsService: AnalyticsService
  ) {
    this.navigationStartSubject = this.eventsService.getEventSubject().NavigationStart;
  }

  contentBlocks: IContentBlock[] = [];

  ngOnInit() {
    this.getData();
    this.navigationStartSubject.subscribe(() => {
      this.getData();
    });
  }

  getData() {
    this.correlationService.generatePageScopedId();
    this.contentRetriever.getContent().subscribe(async (page: IPage) => {
      this.correlationService.setApiRequestId(page.apiRequestId);
      this.title.setTitle(page.title);
      try {
        await this.adService.load;
      } finally {
        this.contentBlocks = page.content;
        this.adService.notify();
        this.analyticsService.trackPageByNielsen();
      }
    });
  }
}

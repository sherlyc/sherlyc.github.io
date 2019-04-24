import { Component, OnInit } from '@angular/core';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import { IPage } from '../../../../../common/__types__/IPage';
import { Title } from '@angular/platform-browser';
import { ContentRetrieverService } from '../../../services/content-retriever/content-retriever.service';
import { AdService } from '../../../services/ad/ad.service';
import { CorrelationService } from '../../../services/correlation/correlation.service';
import { EventsService } from '../../../services/events/events.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  constructor(
    private contentRetriever: ContentRetrieverService,
    private adService: AdService,
    private title: Title,
    private correlationService: CorrelationService,
    private eventsService: EventsService
  ) {}

  contentBlocks: IContentBlock[] = [];

  ngOnInit() {
    this.eventsService.getEventSubject().NavigationStart.subscribe(() => {
      this.correlationService.generatePageScopedId();
      this.getData();
    });
  }

  getData() {
    this.contentRetriever.getContent().subscribe((page: IPage) => {
      this.title.setTitle(page.title);
      this.contentBlocks = page.content;
      this.adService.notify();
      this.correlationService.setApiRequestId(page.apiRequestId);
    });
  }
}

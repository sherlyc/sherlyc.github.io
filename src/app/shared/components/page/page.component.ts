import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { NavigationStart } from "@angular/router";
import { from, Subject, zip } from "rxjs";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IPage } from "../../../../../common/__types__/IPage";
import { AdService } from "../../../services/ad/ad.service";
import { AnalyticsService } from "../../../services/analytics/analytics.service";
import { ContentRetrieverService } from "../../../services/content-retriever/content-retriever.service";
import { CorrelationService } from "../../../services/correlation/correlation.service";
import { EventsService } from "../../../services/events/events.service";
import { FeatureSwitchService } from "../../../services/feature-switch/feature-switch.service";
import { RuntimeService } from "../../../services/runtime/runtime.service";
import { SeoService } from "../../../services/seo/seo.service";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class PageComponent implements OnInit {
  private navigationStartSubject: Subject<NavigationStart>;
  constructor(
    private contentRetriever: ContentRetrieverService,
    private adService: AdService,
    private title: Title,
    private correlationService: CorrelationService,
    private eventsService: EventsService,
    private analyticsService: AnalyticsService,
    private seoService: SeoService,
    private featureSwitchService: FeatureSwitchService,
    private runtime: RuntimeService
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
    this.seoService.reset();
    if (this.runtime.isBrowser()) {
      zip(
        this.contentRetriever.getContent(),
        from(this.featureSwitchService.getFeatures())
      ).subscribe(([page, features]) => this.afterDataRetrieval(page));
    } else {
      this.contentRetriever
        .getContent()
        .subscribe((page) => this.afterDataRetrieval(page));
    }
  }

  private afterDataRetrieval(page: IPage) {
    this.correlationService.setApiRequestId(page.apiRequestId);
    this.title.setTitle(page.title);
    this.contentBlocks = page.content;
    this.adService.notify();
    this.analyticsService.trackPageByNielsen();
  }
}

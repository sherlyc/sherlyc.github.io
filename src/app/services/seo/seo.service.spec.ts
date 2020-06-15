import { TestBed } from "@angular/core/testing";

import { SeoService } from "./seo.service";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { mockService, ServiceMock } from "../mocks/MockService";
import { EventsService } from "../events/events.service";
import { NavigationStart } from "@angular/router";
import { Subject } from "rxjs";

describe("SeoService", () => {
  let service: SeoService;
  let eventsService: ServiceMock<EventsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: EventsService,
          useClass: mockService(EventsService),
        },
      ],
    });
    service = TestBed.inject(SeoService);
    eventsService = TestBed.inject(EventsService) as ServiceMock<EventsService>;
    eventsService.getEventSubject.mockReturnValue({
      NavigationStart: new Subject<NavigationStart>(),
    });
    service.setup();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should count the correct index for a matched content block", () => {
    let contentBlockType = ContentBlockType.HomepageArticle;
    let index = service.index(contentBlockType);
    expect(index).toEqual(0);

    contentBlockType = ContentBlockType.BasicArticleUnit;
    index = service.index(contentBlockType);
    expect(index).toEqual(1);

    contentBlockType = ContentBlockType.PlayStuff;
    index = service.index(contentBlockType);
    expect(index).toEqual(undefined);

    contentBlockType = ContentBlockType.ArticleTitle;
    index = service.index(contentBlockType);
    expect(index).toEqual(2);
  });

  it("should reset the counter when a navigation happens", () => {
    let contentBlockType = ContentBlockType.HomepageArticle;
    let index = service.index(contentBlockType);
    expect(index).toEqual(0);

    contentBlockType = ContentBlockType.BasicArticleUnit;
    index = service.index(contentBlockType);
    expect(index).toEqual(1);

    eventsService
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, "/"));

    expect(service.counter).toEqual(0);

    contentBlockType = ContentBlockType.ArticleTitle;
    index = service.index(contentBlockType);
    expect(index).toEqual(0);
  });
});

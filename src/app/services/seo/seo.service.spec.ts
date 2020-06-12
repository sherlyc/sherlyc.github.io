import { TestBed } from "@angular/core/testing";

import { SeoService } from "./seo.service";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

describe("SeoService", () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
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
});

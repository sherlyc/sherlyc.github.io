import { TestBed } from "@angular/core/testing";

import { MetaTagsService } from "./meta-tags.service";
import { mockService } from "../mocks/MockService";
import { Meta } from "@angular/platform-browser";

describe("MetaTagsService", () => {
  let meta: Meta;
  let metaService: MetaTagsService;

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Meta,
          useClass: mockService(Meta)
        }
      ]
    });

    meta = TestBed.get(Meta);
    metaService = TestBed.get(MetaTagsService);
  });

  it("should be created", () => {
    const service: MetaTagsService = TestBed.get(MetaTagsService);
    expect(service).toBeTruthy();
  });

  it("should create the general meta tags", () => {
    const mockGeneralTags = [
      {
        name: "description",
        content: "test description"
      },
      {
        name: "theme-color",
        content: "#000000"
      }
    ];
    metaService.getGeneralMetaTag = jest.fn(() => mockGeneralTags);

    metaService.setup();

    expect(meta.addTags).toHaveBeenCalledTimes(2);
    expect(meta.addTags).toHaveBeenNthCalledWith(1, mockGeneralTags);
  });

  it("should create the social meta tags", () => {
    const mockSocialTags = [
      {
        name: "fb:app_id",
        content: "207633159308175"
      },
      {
        name: "fb:pages",
        content: "21253884267"
      }
    ];
    metaService.getSocialMetaTags = jest.fn(() => mockSocialTags);

    metaService.setup();

    expect(meta.addTags).toHaveBeenCalledTimes(2);
    expect(meta.addTags).toHaveBeenNthCalledWith(2, mockSocialTags);
  });
});

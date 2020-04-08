import { TestBed } from "@angular/core/testing";
import { Meta } from "@angular/platform-browser";
import { mockService, ServiceMock } from "../mocks/MockService";

import { MetaTagsService } from "./meta-tags.service";

describe("MetaTagsService", () => {
  let meta: Meta;
  let metaService: ServiceMock<MetaTagsService>;

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

    meta = TestBed.inject(Meta) as ServiceMock<Meta>;
    metaService = TestBed.inject(MetaTagsService) as ServiceMock<
      MetaTagsService
    >;
  });

  it("should be created", () => {
    const service: MetaTagsService = TestBed.inject(
      MetaTagsService
    ) as ServiceMock<MetaTagsService>;
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

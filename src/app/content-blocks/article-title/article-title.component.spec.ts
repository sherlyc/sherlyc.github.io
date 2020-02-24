import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { AnalyticsService } from "src/app/services/analytics/analytics.service";
import { mockService, ServiceMock } from "src/app/services/mocks/MockService";
import { FeatureSwitchService } from "../../services/feature-switch/feature-switch.service";
import { ArticleTitleComponent } from "./article-title.component";

describe("ArticleTitle", () => {
  let component: ArticleTitleComponent;
  let fixture: ComponentFixture<ArticleTitleComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ArticleTitleComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: FeatureSwitchService,
          useClass: mockService(FeatureSwitchService)
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ArticleTitleComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.get(AnalyticsService);
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});

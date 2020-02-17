import { BulletItemComponent } from "./bullet-item.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { mockService, ServiceMock } from "../../../services/mocks/MockService";
import { AnalyticsService } from "../../../services/analytics/analytics.service";
import { By } from "@angular/platform-browser";
import { AnalyticsEventsType } from "../../../services/analytics/__types__/AnalyticsEventsType";
import { IBulletItem } from "../../../../../common/__types__/IBulletItem";
import { SharedModule } from "../../shared.module";

describe("Bullet Component", () => {
  let component: BulletItemComponent;
  let fixture: ComponentFixture<BulletItemComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const articleData: IBulletItem = {
    id: "123123",
    strapName: "National",
    linkText: "Dummy Headline",
    linkUrl: "https://dummyurl.com",
    bulletColor: "blue"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();

    analyticsService = TestBed.get(AnalyticsService);

    fixture = TestBed.createComponent(BulletItemComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should send analytics when clicked", () => {
    const { strapName, linkText, id } = articleData;
    component.input = articleData;
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css("a")).nativeElement;
    anchorTag.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: linkText,
      articleId: id
    });
  });

  it("should set bullet color", () => {
    component.input = {
      ...articleData,
      bulletColor: "red"
    };

    fixture.detectChanges();

    const bullet = fixture.debugElement.query(By.css(".bullet")).nativeElement;
    expect(bullet.style.color).toEqual("red");
  });
});

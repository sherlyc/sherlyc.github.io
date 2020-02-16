import { BulletListComponent } from "./bullet-list.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IBulletList } from "../../../../common/__types__/IBulletList";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { SharedModule } from "../../shared/shared.module";
import { By } from "@angular/platform-browser";
import { BulletItemComponent } from "../../shared/components/bullet-item/bullet-item.component";
import { IBulletItem } from "../../../../common/__types__/IBulletItem";

describe("Bullet List Component", () => {
  let component: BulletListComponent;
  let fixture: ComponentFixture<BulletListComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const bulletItem: IBulletItem = {
    id: "123123",
    strapName: "National",
    linkText: "Dummy Headline",
    linkUrl: "https://dummyurl.com",
    bulletColor: "blue"
  };

  const bulletListData: IBulletList = {
    type: ContentBlockType.BulletList,
    items: [bulletItem, bulletItem, bulletItem]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [BulletListComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();

    analyticsService = TestBed.get(AnalyticsService);

    fixture = TestBed.createComponent(BulletListComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should pass correct input to bullet component", () => {
    component.input = bulletListData;
    fixture.detectChanges();

    const bullet: BulletItemComponent = fixture.debugElement.query(
      By.directive(BulletItemComponent)
    ).componentInstance;

    expect(bullet.input.linkText).toBeTruthy();
    expect(bullet.input.linkUrl).toBeTruthy();
    expect(bullet.input.bulletColor).toBeTruthy();
  });
});

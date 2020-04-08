import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBulletItem } from "../../../../common/__types__/IBulletItem";
import { IBulletList } from "../../../../common/__types__/IBulletList";
import { Logo } from "../../../../common/Logo";
import { Section } from "../../../../server-src/services/section";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { SharedModule } from "../../shared/shared.module";
import { BulletListComponent } from "./bullet-list.component";

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
    logo: Logo.Newsroom,
    logoLink: "/" + Section.Newsroom,
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

    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;

    fixture = TestBed.createComponent(BulletListComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should pass logo name to logo component", () => {
    component.input = { ...bulletListData, logo: Logo.Newsroom };
    fixture.detectChanges();

    const logo: LogoComponent = fixture.debugElement.query(
      By.directive(LogoComponent)
    ).componentInstance;

    expect(logo.name).toBe(Logo.Newsroom);
  });

  it("should send analytics when clicked", () => {
    component.input = bulletListData;
    fixture.detectChanges();
    const anchorTag = fixture.debugElement.query(By.css(".itemLink"))
      .nativeElement;
    anchorTag.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: "National",
      articleHeadline: "Dummy Headline",
      articleId: "123123"
    });
  });

  it("should set bullet color", () => {
    component.input = bulletListData;
    fixture.detectChanges();
    const bullet = fixture.debugElement.query(By.css(".bullet")).nativeElement;
    expect(bullet.style.color).toEqual("blue");
  });

  it("set logo link on logo", () => {
    component.input = bulletListData;
    fixture.detectChanges();

    const logoLink = fixture.debugElement.query(By.css(".logoLink"))
      .nativeElement;
    expect(logoLink.href).toContain(bulletListData.logoLink);
  });
});

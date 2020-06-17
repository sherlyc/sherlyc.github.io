import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { IModuleTitle } from "../../../../common/__types__/IModuleTitle";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { OpenExternalLinkDirective } from "../../shared/directives/open-external-link/open-external-link.directive";
import { ModuleTitleComponent } from "./module-title.component";

describe("ModuleTitleComponent", () => {
  let analyticsService: ServiceMock<AnalyticsService>;
  let component: ModuleTitleComponent;
  let fixture: ComponentFixture<ModuleTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleTitleComponent, OpenExternalLinkDirective],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
    fixture = TestBed.createComponent(ModuleTitleComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the module name when provided", () => {
    const moduleName = "FakeModuleName";

    component.input = {
      displayName: moduleName
    } as IModuleTitle;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css(".title"));
    expect(title.nativeElement.textContent).toEqual(moduleName);
  });

  it("should display line but not module name when name is empty", () => {
    const moduleName = "";

    component.input = {
      displayName: moduleName
    } as IModuleTitle;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css(".title"));
    expect(title).toBeFalsy();
  });

  it("should set the title color", () => {
    component.input = {
      displayName: "ModuleTitle",
      displayNameColor: "red"
    } as IModuleTitle;

    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css(".title"));
    expect(title.styles.color).toBe(component.input.displayNameColor);
  });

  it("should not render a link if url is not provided", () => {
    component.input = {
      displayName: "National"
    } as IModuleTitle;

    fixture.detectChanges();

    const moduleTitle = fixture.debugElement.query(By.css(".module-title"));

    expect(moduleTitle.attributes.href).toBeFalsy();
  });

  it("should render a link if url is provided", () => {
    component.input = {
      displayName: "National",
      linkUrl: "/national"
    } as IModuleTitle;

    fixture.detectChanges();

    const moduleTitle = fixture.debugElement.query(By.css(".module-title"));
    const title = fixture.debugElement.query(By.css(".title")).nativeElement;

    expect(moduleTitle.attributes.href).toBe(component.input.linkUrl);
    expect(title.textContent).toBe(component.input.displayName);
  });

  it("should not render link and title when both are not provided", () => {
    component.input = {
      displayName: "",
      linkUrl: ""
    } as IModuleTitle;

    fixture.detectChanges();

    const moduleTitle = fixture.debugElement.query(By.css(".module-title"));
    const title = fixture.debugElement.query(By.css(".title"));

    expect(moduleTitle.attributes.href).toBeFalsy();
    expect(title).toBeFalsy();
  });

  it("should send analytics when clicked", () => {
    component.input = {
      displayName: "National",
      linkUrl: "/national"
    } as IModuleTitle;

    fixture.detectChanges();

    const moduleTitle = fixture.debugElement.query(By.css(".module-title"))
      .nativeElement;
    moduleTitle.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.MODULE_TITLE_CLICKED,
      title: "National"
    });
  });
});

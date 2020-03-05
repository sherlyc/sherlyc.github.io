import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ModuleTitleComponent } from "./module-title.component";
import { IModuleTitle } from "../../../../common/__types__/IModuleTitle";
import { By } from "@angular/platform-browser";
import { OpenExternalLinkDirective } from "../../shared/directives/open-external-link/open-external-link.directive";
import { mockService } from "../../services/mocks/MockService";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";

describe("ModuleTitleComponent", () => {
  let analyticsService: AnalyticsService;
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
    analyticsService = TestBed.get(AnalyticsService);
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

  it("should not be clickable if url is not provided", () => {
    component.input = {
      displayName: "National",
      linkUrl: ""
    } as IModuleTitle;

    fixture.detectChanges();

    const moduleTitle = fixture.debugElement.query(By.css(".module-title"));
    expect(moduleTitle.attributes.href).toBe(null);
  });

  it("should be clickable if url is provided", () => {
    component.input = {
      displayName: "National",
      linkUrl: "/national"
    } as IModuleTitle;

    fixture.detectChanges();

    const moduleTitle = fixture.debugElement.query(By.css(".module-title"));
    expect(moduleTitle.attributes.href).toBe(component.input.linkUrl);
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

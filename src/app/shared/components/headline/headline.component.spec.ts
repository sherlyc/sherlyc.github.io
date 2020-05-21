import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { getUnixTime, sub } from "date-fns";
import { HeadlineFlags } from "../../../../../common/HeadlineFlags";
import { FeatureSwitchService } from "../../../services/feature-switch/feature-switch.service";
import { mockService } from "../../../services/mocks/MockService";
import { SharedModule } from "../../shared.module";
import { TimeComponent } from "../time/time.component";
import { HeadlineComponent } from "./headline.component";

describe("Headline Component", () => {
  let component: HeadlineComponent;
  let fixture: ComponentFixture<HeadlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [],
      providers: [
        {
          provide: FeatureSwitchService,
          useClass: mockService(FeatureSwitchService)
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadlineComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render input data", () => {
    const headline = "Windy Wellington";
    component.headline = headline;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css("h3")).nativeElement.textContent.trim()
    ).toEqual(headline);
  });

  it("should not display time when not provided", () => {
    component.headline = "Headline";
    component.headlineFlags = [HeadlineFlags.PHOTO];

    fixture.detectChanges();

    const time = fixture.debugElement.query(By.directive(TimeComponent));

    expect(time).toBeFalsy();
  });

  it("should inherit text color by default", () => {
    fixture.detectChanges();
    const h3 = fixture.debugElement.query(By.css("h3"));

    expect(h3.nativeElement.style.color).toBe("");
  });

  it("should set text color on h3", () => {
    component.textColor = "white";

    fixture.detectChanges();
    const h3 = fixture.debugElement.query(By.css("h3"));

    expect(h3.nativeElement.style.color).toBe("white");
  });

  it("should show time when it is less than 2 hours ago", () => {
    // 1 hour 20 minutes ago
    component.timeStamp = getUnixTime(
      sub(new Date(), { hours: 1, minutes: 20 })
    );

    fixture.detectChanges();
    const time = fixture.debugElement.query(By.directive(TimeComponent));

    expect(time).toBeTruthy();
  });

  it("should not show time when the timeStamp when is more than 2 hours ago", () => {
    component.timeStamp = getUnixTime(sub(new Date(), { hours: 2 }));

    fixture.detectChanges();
    const time = fixture.debugElement.query(By.directive(TimeComponent));

    expect(time).toBeFalsy();
  });

  it("should not show time when the timeStamp is empty", () => {
    component.timeStamp = undefined;

    const time = fixture.debugElement.query(By.directive(TimeComponent));

    expect(time).toBeFalsy();
  });

  it("should set identifier", () => {
    component.identifierColor = "white";
    component.identifier = "Hello";

    fixture.detectChanges();
    const identifier = fixture.debugElement.query(By.css("h3 > span"))
      .nativeElement;

    expect(identifier.textContent).toBe("Hello");
    expect(identifier.style.color).toBe("white");
  });

  it("should hide identifier if not provided", () => {
    component.identifier = undefined;

    fixture.detectChanges();
    const identifier = fixture.debugElement.query(By.css("h3 > span"));

    expect(identifier).toBeFalsy();
  });

  it("should have identifier color if not provided", () => {
    component.identifier = "Hello";
    component.identifierColor = undefined;

    fixture.detectChanges();
    const identifier = fixture.debugElement.query(By.css("h3 > span"))
      .nativeElement;

    expect(identifier.style.color).toBeTruthy();
  });
});

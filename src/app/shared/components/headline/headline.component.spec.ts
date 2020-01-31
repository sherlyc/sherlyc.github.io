import { HeadlineComponent } from "./headline.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeadlineFlagComponent } from "../headline-flag/headline-flag.component";
import { HeadlineFlags } from "../../../../../common/HeadlineFlags";
import { TimeAgoComponent } from "../time-ago/time-ago.component";
import { SharedModule } from "../../shared.module";
import { FeatureSwitchService } from "../../../services/feature-switch/feature-switch.service";
import { mockService } from "../../../services/mocks/MockService";

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

  it("should not display time ago when not provided", () => {
    component.headline = "Headline";
    component.headlineFlags = [HeadlineFlags.PHOTO];

    fixture.detectChanges();

    const timeAgo = fixture.debugElement.query(By.directive(TimeAgoComponent));

    expect(timeAgo).toBeFalsy();
  });

  it("should set text color on h3", () => {
    component.textColor = "white";

    fixture.detectChanges();
    const h3 = fixture.debugElement.query(By.css("h3"));

    expect(h3.nativeElement.style.color).toBe("white");
  });
});

import { WeatherIconComponent } from "./weather-icon.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Forecasts } from "../../../../../common/Forecasts";
import { By } from "@angular/platform-browser";

describe("Headline Flag Component", () => {
  let component: WeatherIconComponent;
  let fixture: ComponentFixture<WeatherIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [WeatherIconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherIconComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it.each([
    [Forecasts.cloud, ".cloud"],
    [Forecasts.drizzle, ".drizzle"],
    [Forecasts.fewshowers, ".fewshowers"],
    [Forecasts.fine, ".fine"],
    [Forecasts.finewithshowers, ".finewithshowers"],
    [Forecasts.fog, ".fog"],
    [Forecasts.hail, ".hail"],
    [Forecasts.partcloudy, ".partcloudy"],
    [Forecasts.rain, ".rain"],
    [Forecasts.showers, ".showers"],
    [Forecasts.snow, ".snow"],
    [Forecasts.thunder, ".thunder"],
    [Forecasts.wind, ".wind"],
    ["tick", ".tick"],
    ["unknown", ".unknown"],
    ["dropdown", ".dropdown"],
    ["exit", ".exit"]
  ])("should show %s icon", (icon, iconSelector) => {
    component.icon = icon;

    fixture.detectChanges();

    const weatherIcon = fixture.debugElement.query(By.css(iconSelector));
    expect(weatherIcon).toBeTruthy();
  });
});

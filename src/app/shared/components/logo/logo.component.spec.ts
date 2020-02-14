import { LogoComponent } from "./logo.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Logo } from "../../../../../common/Logo";

describe.skip("Svg Component", () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [LogoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it.each([
    [Logo.ManawatuStandard, ".manawatustandard"],
    [Logo.MarlboroughExpress, ".marlboroughexpress"],
    [Logo.NelsonMail, ".nelsonmail"],
    [Logo.SouthlandTimes, ".southlandtimes"],
    [Logo.TaranakiDailyNews, ".taranakidailynews"],
    [Logo.ThePress, ".thepress"],
    [Logo.DominionPost, ".dominionpost"],
    [Logo.TimaruHerald, ".timaruherald"],
    [Logo.WaikatoTimes, ".waikatotimes"],
    [Logo.BeautyHeaven, ".beautyheaven"],
    [Logo.FoodToLove, ".foodtolove"],
    [Logo.HomesToLove, ".homestolove"],
    [Logo.Metro, ".metro"],
    [Logo.Newsroom, ".newsroom"],
    [Logo.Noted, ".noted"],
    [Logo.Now2love, ".now2love"],
    [Logo.Tarana, ".tarana"]
  ])("should show %s", async (logo: Logo, logoSelector: string) => {
    component.name = logo;
    fixture.detectChanges();

    const svg = fixture.debugElement.query(By.css(logoSelector));

    expect(svg).toBeTruthy();
  });
});

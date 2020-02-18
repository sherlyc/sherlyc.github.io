import { LogoComponent } from "./logo.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Logo } from "../../../../../common/Logo";

describe("Logo Component", () => {
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
    [Logo.ManawatuStandard, "manawatustandard"],
    [Logo.MarlboroughExpress, "marlboroughexpress"],
    [Logo.NelsonMail, "nelsonmail"],
    [Logo.SouthlandTimes, "southlandtimes"],
    [Logo.TaranakiDailyNews, "taranakidailynews"],
    [Logo.ThePress, "thepress"],
    [Logo.DominionPost, "dominionpost"],
    [Logo.TimaruHerald, "timaruherald"],
    [Logo.WaikatoTimes, "waikatotimes"],
    [Logo.BeautyHeaven, "beautyheaven"],
    [Logo.FoodToLove, "foodtolove"],
    [Logo.HomesToLove, "homestolove"],
    [Logo.Metro, "metro"],
    [Logo.Newsroom, "newsroom"],
    [Logo.Noted, "noted"],
    [Logo.NowToLove, "nowtolove"],
    [Logo.Tarana, "tarana"]
  ])("should show %s", async (logo: Logo, logoClass: string) => {
    component.name = logo;
    fixture.detectChanges();

    expect(component.content.toString()).toEqual(
      expect.stringContaining(`class="${logoClass}"`)
    );
  });
});

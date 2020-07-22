import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Logo } from "../../../../../common/Logo";
import { LogoComponent } from "./logo.component";

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
    [Logo.Newsroom, "newsroom"],
    [Logo.Tarana, "tarana"],
    [Logo.Auckland, "auckland"],
    [Logo.Bravo, "bravo"],
    [Logo.LocalDemocracyReporting, "localDemocracyReporting"],
    [Logo.RNZ, "rnz"]
  ])("should show %s", async (logo: Logo, logoClass: string) => {
    component.name = logo;
    fixture.detectChanges();

    expect(component.content.toString()).toEqual(
      expect.stringContaining(`class="${logoClass}"`)
    );
  });
});

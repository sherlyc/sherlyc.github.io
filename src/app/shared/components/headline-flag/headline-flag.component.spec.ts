import { HeadlineFlagComponent } from "./headline-flag.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeadlineFlags } from "../../../../../common/HeadlineFlags";
import { By } from "@angular/platform-browser";

describe("Headline Flag Component", () => {
  let component: HeadlineFlagComponent;
  let fixture: ComponentFixture<HeadlineFlagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [HeadlineFlagComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeadlineFlagComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it.each([
    [HeadlineFlags.ADVERTISEMENT, ".advertisement-flag"],
    [HeadlineFlags.SPONSORED, ".sponsored-flag"],
    [HeadlineFlags.STUFF_NATION, ".stuff-nation-flag"],
    [HeadlineFlags.PHOTO, ".photo-flag"],
    [HeadlineFlags.VIDEO, ".video-flag"],
    [HeadlineFlags.PLAY_STUFF, ".play-stuff-flag"]
  ])("should show %s", async (headlineFlag, headlineFlagSelector) => {
    component.flag = headlineFlag as HeadlineFlags;
    fixture.detectChanges();

    const advertisementFlagElement = fixture.debugElement.query(
      By.css(headlineFlagSelector)
    );

    expect(advertisementFlagElement).toBeTruthy();
  });
});

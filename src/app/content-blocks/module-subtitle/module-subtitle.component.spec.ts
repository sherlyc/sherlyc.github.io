import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ModuleSubtitleComponent } from "./module-subtitle.component";
import { IModuleSubtitle } from "../../../../common/__types__/IModuleSubtitle";
import { By } from "@angular/platform-browser";

describe("ModuleSubtitleComponent", () => {
  let component: ModuleSubtitleComponent;
  let fixture: ComponentFixture<ModuleSubtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleSubtitleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSubtitleComponent);
    component = fixture.componentInstance;
    component.input = {
      displayName: "Something",
      displayNameColor: "#333"
    } as IModuleSubtitle;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display displayName in title", () => {
    const displayName = "Something";
    component.input = {
      displayName
    } as IModuleSubtitle;

    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css(".title")).nativeElement;

    expect(title.textContent).toBe(displayName);
  });

  it("should apply displayColor to title", () => {
    const displayNameColor = "red";
    component.input = {
      displayNameColor: displayNameColor
    } as IModuleSubtitle;

    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css(".title")).nativeElement;

    expect(title.style.color).toBe(displayNameColor);
  });
});

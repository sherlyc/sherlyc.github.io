import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlayStuffVideoComponent } from "./play-stuff-video.component";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../shared.module";
import { FluidImageComponent } from "../fluid-image/fluid-image.component";

describe("PlayStuffVideoComponent", () => {
  let component: PlayStuffVideoComponent;
  let fixture: ComponentFixture<PlayStuffVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayStuffVideoComponent, FluidImageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayStuffVideoComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should set inputs", () => {
    component.image = "hello.png";
    component.id = "1";
    component.text = "text";
    component.highlight = false;
    component.orientation = {
      mobile: Orientation.Landscape,
      tablet: Orientation.Portrait,
      desktop: Orientation.Landscape,
    };

    fixture.detectChanges();

    const wrapper: HTMLDivElement = fixture.debugElement.query(
      By.css(".wrapper")
    ).nativeElement;
    expect(wrapper.className).not.toContain("highlight");
    expect(wrapper.className).toContain("landscape-mobile");
    expect(wrapper.className).toContain("portrait-tablet");
    expect(wrapper.className).toContain("landscape-desktop");

    const anchor: HTMLAnchorElement = fixture.debugElement.query(By.css("a"))
      .nativeElement;
    expect(anchor.href).toBe(
      `https://play.stuff.co.nz/details/_${component.id}`
    );

    const image: HTMLUnknownElement & any = fixture.debugElement.query(
      By.css("app-fluid-image")
    ).nativeElement;
    expect(image.imageSrc).toBe(component.image);
    expect(image.caption).toBe(component.text);

    const text: HTMLDivElement = fixture.debugElement.query(By.css(".text"))
      .nativeElement;
    expect(text.textContent).toBe(component.text);
  });
});

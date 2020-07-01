import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  IModuleHeader,
  ModuleHeaderVariation
} from "../../../../common/__types__/IModuleHeader";
import { ModuleHeaderComponent } from "./module-header.component";

describe("ModuleHeaderComponent", () => {
  let component: ModuleHeaderComponent;
  let fixture: ComponentFixture<ModuleHeaderComponent>;

  const input: IModuleHeader = {
    type: ContentBlockType.ModuleHeader,
    title: "Grumpy Cat",
    url: "http://www.grumpy-cat.com",
    color: AccentColor.Black,
    variation: ModuleHeaderVariation.SmallerNoLine
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleHeaderComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    component.input = input;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should show link with title when both title and url are specified", () => {
    component.input = {
      ...input,
      title: "Grumpy Cat",
      url: "https://grumpy-cat.com"
    };

    fixture.detectChanges();

    const link: HTMLAnchorElement = fixture.debugElement.query(By.css("a"))
      .nativeElement;
    expect(link.getAttribute("href")).toBe(component.input.url);
    expect(link.textContent).toBe(component.input.title);
  });

  it("should show title without link when url is unspecified", () => {
    component.input = {
      ...input,
      title: "Who wants to be a billionaire",
      url: undefined
    };

    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css("div")).nativeElement;
    const link = fixture.debugElement.query(By.css("a"));
    expect(wrapper.textContent).toBe(component.input.title);
    expect(link).toBeFalsy();
  });

  it("should not show title or link when title is unspecified", () => {
    component.input = {
      ...input,
      title: undefined,
      url: "http://undefined.com"
    };

    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css("div")).nativeElement;
    const link = fixture.debugElement.query(By.css("a"));
    expect(wrapper.textContent).toBeFalsy();
    expect(link).toBeFalsy();
  });

  it("should set variation when specified", () => {
    component.input = {
      ...input,
      variation: ModuleHeaderVariation.Smaller
    };

    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css("div"));
    expect(wrapper.nativeElement.className).toContain(
      `variation-${component.input.variation}`.toLowerCase()
    );
  });

  it("should not set variation when not specified", () => {
    component.input = {
      ...input,
      variation: undefined
    };

    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css("div"));
    expect(wrapper.nativeElement.className).toBeFalsy();
  });

  it("should set color", () => {
    component.input = {
      ...input,
      color: AccentColor.AppleGreen
    };

    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css("div"));
    const link = fixture.debugElement.query(By.css("a"));
    expect(wrapper.styles.color).toBe(component.input.color);
    expect(link.styles.color).toBe(component.input.color);
  });
});

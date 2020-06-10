import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ModuleHeaderComponent } from "./module-header.component";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import {
  IModuleHeader,
  ModuleHeaderVariation
} from "../../../../common/__types__/IModuleHeader";
import { By } from "@angular/platform-browser";

describe("ModuleHeaderComponent", () => {
  let component: ModuleHeaderComponent;
  let fixture: ComponentFixture<ModuleHeaderComponent>;

  const input: IModuleHeader = {
    type: ContentBlockType.ModuleHeader,
    title: "Grumpy Cat",
    url: "http://www.grumpy-cat.com",
    color: AccentColor.TopStoriesBlue,
    variation: ModuleHeaderVariation.NoLine
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

  it("should set inputs", () => {
    const headerInput: IModuleHeader = {
      type: ContentBlockType.ModuleHeader,
      title: "Grumpy Cat",
      url: "http://www.grumpy-cat.com",
      color: AccentColor.TopStoriesBlue
    };
    component.input = headerInput;

    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css("div"));
    expect(wrapper.styles.color).toBe(headerInput.color);
    expect(wrapper.nativeElement.className).toBeFalsy();

    const link: HTMLAnchorElement = fixture.debugElement.query(By.css("a"))
      .nativeElement;
    expect(link.getAttribute("href")).toBe(headerInput.url);
    expect(link.textContent).toBe(headerInput.title);
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

  it("should set variation class", () => {
    component.input = {
      ...input,
      variation: ModuleHeaderVariation.NoLine
    };

    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css("div"));
    expect(wrapper.nativeElement.className).toContain(
      `variation-${component.input.variation}`.toLowerCase()
    );
  });
});

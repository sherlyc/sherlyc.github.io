import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ModuleHeaderComponent } from "./module-header.component";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { IModuleHeader, ModuleHeaderVariation } from "../../../../common/__types__/IModuleHeader";
import { By } from "@angular/platform-browser";

describe("ModuleHeaderComponent", () => {
  let component: ModuleHeaderComponent;
  let fixture: ComponentFixture<ModuleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleHeaderComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    component.input = {
      type: ContentBlockType.ModuleHeader,
      color: AccentColor.TopStoriesBlue,
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should set inputs", () => {
    const input: IModuleHeader = {
      type: ContentBlockType.ModuleHeader,
      title: "Grumpy Cat",
      url: "http://www.grumpy-cat.com",
      color: AccentColor.TopStoriesBlue,
      variation: ModuleHeaderVariation.NoLine
    };
    component.input = input;

    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css("div"));
    expect(wrapper.styles.color).toBe(input.color);
    expect(wrapper.nativeElement.className).toEqual(`variation-${input.variation}`.toLowerCase());

    const link: HTMLAnchorElement = fixture.debugElement.query(By.css("a")).nativeElement;
    expect(link.getAttribute("href")).toBe(input.url);
    expect(link.textContent).toBe(input.title);
  });
});

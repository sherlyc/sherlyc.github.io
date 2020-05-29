import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TagLinkComponent } from "./tag-link.component";
import { By } from "@angular/platform-browser";

describe("TagComponent", () => {
  let component: TagLinkComponent;
  let fixture: ComponentFixture<TagLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagLinkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set color on link", () => {
    component.color = "red";

    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css("a")).nativeElement;

    expect(link.style.color).toBe(component.color);
  });

  it("should set url on link", () => {
    component.url = "https://www.example.com/";

    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css("a")).nativeElement;

    expect(link.href).toBe(component.url);
  });

  it("should render name in link", () => {
    component.name = "travel";

    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css("a")).nativeElement;

    expect(link.textContent).toBe(component.name);
  });
});

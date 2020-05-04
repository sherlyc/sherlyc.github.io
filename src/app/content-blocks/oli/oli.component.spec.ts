import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OliComponent } from "./oli.component";

describe("OliComponent", () => {
  let component: OliComponent;
  let fixture: ComponentFixture<OliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OliComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

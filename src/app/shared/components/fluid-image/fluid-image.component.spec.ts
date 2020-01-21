import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FluidImageComponent } from "./fluid-image.component";

describe("FluidImageComponent", () => {
  let component: FluidImageComponent;
  let fixture: ComponentFixture<FluidImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluidImageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FluidImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

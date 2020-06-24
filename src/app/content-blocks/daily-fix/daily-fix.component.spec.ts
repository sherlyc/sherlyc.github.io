import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DailyFixComponent } from "./daily-fix.component";

describe("DailyFixComponent", () => {
  let component: DailyFixComponent;
  let fixture: ComponentFixture<DailyFixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyFixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

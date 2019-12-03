import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BasicAdUnitComponent } from "./basic-ad-unit.component";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBasicAdUnit } from "../../../../common/__types__/IBasicAdUnit";

describe("BasicAdUnitComponent", () => {
  let component: BasicAdUnitComponent;
  let fixture: ComponentFixture<BasicAdUnitComponent>;
  const adUnitData: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: "business"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicAdUnitComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAdUnitComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    component.input = adUnitData;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it("should add class based on context", () => {
    component.input = adUnitData;
    fixture.detectChanges();
    const adUnitClassList = fixture.debugElement.nativeElement.classList;

    expect(adUnitClassList.contains(adUnitData.context)).toBe(true);
  });
});

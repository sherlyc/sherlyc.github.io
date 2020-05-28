import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PartnerContentComponent } from "./partner-content.component";
import { SharedModule } from "../../shared/shared.module";

describe("PartnerContentComponent", () => {
  let component: PartnerContentComponent;
  let fixture: ComponentFixture<PartnerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PartnerContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

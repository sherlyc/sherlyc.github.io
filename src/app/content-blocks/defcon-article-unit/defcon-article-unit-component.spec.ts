import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "../../shared/shared.module";
import { DefconArticleUnitComponent } from "./defcon-article-unit.component";

describe("DefconArticleUnitComponent", () => {
  let component: DefconArticleUnitComponent;
  let fixture: ComponentFixture<DefconArticleUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [DefconArticleUnitComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefconArticleUnitComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

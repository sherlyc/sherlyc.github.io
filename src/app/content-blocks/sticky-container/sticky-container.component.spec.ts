import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StickyContainerComponent } from "./sticky-container.component";
describe("Sticky Container", () => {
  let fixture: ComponentFixture<StickyContainerComponent>;
  let component: StickyContainerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickyContainerComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(StickyContainerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

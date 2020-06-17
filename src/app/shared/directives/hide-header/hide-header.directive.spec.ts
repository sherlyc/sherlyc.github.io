import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { mockService } from "../../../services/mocks/MockService";
import { RuntimeService } from "../../../services/runtime/runtime.service";
import { HideHeaderDirective } from "./hide-header.directive";

@Component({
  selector: "app-fake-header",
  template:
    '<header style="height: 40px" appHideHeader>fake data</header> <div style="height: 9999px"></div>'
})
class FakeHeaderComponent {}

describe("Hide Header", () => {
  let fixture: ComponentFixture<FakeHeaderComponent>;
  let component: FakeHeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeHeaderComponent, HideHeaderDirective],
      providers: [
        { provide: RuntimeService, useClass: mockService(RuntimeService) }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(FakeHeaderComponent);
    component = fixture.componentInstance;
  });

  it("should apply default style", () => {
    const header = fixture.debugElement.query(By.css("header"));
    const style = header.nativeElement.style;

    expect(style.position).toBe("fixed");
    expect(style.width).toBe("100%");
    expect(style.zIndex).toBe("100");
    expect(style.top).toBe("0px");
  });

  it("should hide the header when scroll down", () => {
    const elementRef = {
      nativeElement: { style: {}, offsetHeight: 40 }
    } as any;

    const directive = new HideHeaderDirective(elementRef, {
      isBrowser: () => true
    } as any);

    (window as any).pageYOffset = 0;
    directive.windowScrolled();
    expect(elementRef.nativeElement.style.transform).toBe("translateY(0px)");

    (window as any).pageYOffset = 100;
    directive.windowScrolled();
    expect(elementRef.nativeElement.style.transform).toBe("translateY(-40px)");
  });

  it("should show the header when scroll up", () => {
    const elementRef = {
      nativeElement: { style: {}, offsetHeight: 40 }
    } as any;

    const directive = new HideHeaderDirective(elementRef, {
      isBrowser: () => true
    } as any);

    (window as any).pageYOffset = 0;
    directive.windowScrolled();

    (window as any).pageYOffset = 100;
    directive.windowScrolled();
    expect(elementRef.nativeElement.style.transform).toBe("translateY(-40px)");

    (window as any).pageYOffset = 0;
    directive.windowScrolled();
    expect(elementRef.nativeElement.style.transform).toBe("translateY(0px)");
  });
});

import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RuntimeService } from "../../../services/runtime/runtime.service";
import { mockService, ServiceMock } from "../../../services/mocks/MockService";
import { ResizeDirective } from "./resize.directive";
import { By } from "@angular/platform-browser";
import { ResizeObserverService } from "../../../services/resize-observer/resize-observer.service";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: "app-fake-component",
  template:
    '<div *ngIf="toShow" id="fake-component" appResizeObserver (resize)="onResize($event)">fake data</div>'
})
class FakeResizeComponent {
  toShow = false;

  onResize(entry: any) {}
}

describe("Resize Directive", () => {
  let fixture: ComponentFixture<FakeResizeComponent>;
  let component: FakeResizeComponent;
  let runtimeService: ServiceMock<RuntimeService>;
  let resizeObserverService: ServiceMock<ResizeObserverService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeResizeComponent, ResizeDirective],
      providers: [
        { provide: RuntimeService, useClass: mockService(RuntimeService) },
        {
          provide: ResizeObserverService,
          useClass: mockService(ResizeObserverService)
        }
      ]
    }).compileComponents();
    runtimeService = TestBed.get(RuntimeService);
    resizeObserverService = TestBed.get(ResizeObserverService);
  });

  it("should call the resizeCallBack when resized", () => {
    const observable = new Subject<ResizeObserverEntry>();
    resizeObserverService.observe.mockReturnValue(observable);
    runtimeService.isBrowser.mockReturnValue(true);
    fixture = TestBed.createComponent(FakeResizeComponent);
    component = fixture.componentInstance;
    component.toShow = true;
    jest.spyOn(component, "onResize");
    fixture.detectChanges();

    const observedElement = fixture.debugElement.query(
      By.css("#fake-component")
    ).nativeElement;
    observable.next({ target: observedElement } as ResizeObserverEntry);

    expect(component.onResize).toHaveBeenCalledTimes(1);
    expect(component.onResize).toHaveBeenCalledWith({
      target: observedElement
    });
  });

  it("should unsubscribe when destroyed", () => {
    const observable = new Subject<ResizeObserverEntry>();
    resizeObserverService.observe.mockReturnValue(observable);
    runtimeService.isBrowser.mockReturnValue(true);
    fixture = TestBed.createComponent(FakeResizeComponent);
    component = fixture.componentInstance;
    component.toShow = true;
    fixture.detectChanges();

    const directiveInstance = fixture.debugElement
      .query(By.directive(ResizeDirective))
      .injector.get(ResizeDirective);
    const subscription = directiveInstance.subscription as Subscription;
    jest.spyOn(subscription, "unsubscribe");

    component.toShow = false;
    fixture.detectChanges();

    expect(subscription.unsubscribe).toHaveBeenCalled();
  });
});

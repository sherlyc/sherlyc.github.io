import { mockService, ServiceMock } from "../../../services/mocks/MockService";
import { IntersectionObserverService } from "../../../services/intersection-observer/intersection-observer.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IntersectionObserverDirective } from "./intersection-observer.directive";
import { Component } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { RuntimeService } from "../../../services/runtime/runtime.service";
import { By } from "@angular/platform-browser";

@Component({
  selector: "app-fake-component",
  template:
    '<div id="fake-component" appIntersectionObserver (intersect)="onIntersect($event)">Fake Component</div>'
})
class FakeComponent {
  onIntersect(entry: IntersectionObserverEntry) {}
}

describe("Intersection Observer Directive", function() {
  let fixture: ComponentFixture<FakeComponent>;
  let component: FakeComponent;
  let runtimeService: ServiceMock<RuntimeService>;
  let intersectionObserverService: ServiceMock<IntersectionObserverService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeComponent, IntersectionObserverDirective],
      providers: [
        { provide: RuntimeService, useClass: mockService(RuntimeService) },
        {
          provide: IntersectionObserverService,
          useClass: mockService(IntersectionObserverService)
        }
      ]
    }).compileComponents();
    runtimeService = TestBed.get(RuntimeService);
    intersectionObserverService = TestBed.get(IntersectionObserverService);

    fixture = TestBed.createComponent(FakeComponent);
    component = fixture.componentInstance;
  });

  it("should call intersectCallback when intersecting", () => {
    const observable = new Subject<IntersectionObserverEntry>();
    intersectionObserverService.observe.mockReturnValue(observable);
    runtimeService.isBrowser.mockReturnValue(true);
    jest.spyOn(component, "onIntersect");

    fixture.detectChanges();

    const observedElement = fixture.debugElement.query(
      By.css("#fake-component")
    ).nativeElement;
    observable.next({ target: observedElement } as IntersectionObserverEntry);
    expect(component.onIntersect).toHaveBeenCalledTimes(1);
    expect(component.onIntersect).toHaveBeenCalledWith({
      target: observedElement
    });
  });

  it("should unsubscribe when destroyed", () => {
    const observable = new Subject<IntersectionObserverEntry>();
    intersectionObserverService.observe.mockReturnValue(observable);
    runtimeService.isBrowser.mockReturnValue(true);

    fixture.detectChanges();

    const directiveInstance = fixture.debugElement
      .query(By.directive(IntersectionObserverDirective))
      .injector.get(IntersectionObserverDirective);
    const subscription = directiveInstance.subscription as Subscription;
    jest.spyOn(subscription, "unsubscribe");

    fixture.destroy();

    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  it("should not observe element when in server side", () => {
    runtimeService.isBrowser.mockReturnValue(false);

    fixture.detectChanges();

    expect(intersectionObserverService.observe).not.toHaveBeenCalled();
  });
});

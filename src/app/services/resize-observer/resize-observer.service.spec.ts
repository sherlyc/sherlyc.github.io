import { TestBed } from "@angular/core/testing";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { ResizeObserverService } from "./resize-observer.service";
import { EventEmitter } from "@angular/core";
import { Observable, Subscription } from "rxjs";

let triggerResize: Function;
let observed: any[] = [];

jest.mock("resize-observer-polyfill", () => ({
  default: class FakeResizeObserver {
    callback: Function;

    constructor(callback: Function) {
      this.callback = callback;

      triggerResize = () => {
        this.fakeTriggerResize();
      };
    }

    fakeTriggerResize() {
      this.callback(
        observed.map((observedElement) => ({ target: observedElement }))
      );
    }

    observe(target: Element): void {
      observed.push(target);
    }

    unobserve(target: Element): void {
      observed = observed.filter((element) => element !== target);
    }
  }
}));

const clearObservedElements = () => {
  observed = [];
};

describe("Resize Observer", () => {
  let runtimeService: ServiceMock<RuntimeService>;
  let resizeObserverService: ServiceMock<ResizeObserverService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: RuntimeService, useClass: mockService(RuntimeService) }
      ]
    }).compileComponents();
    runtimeService = TestBed.get(RuntimeService);
    resizeObserverService = TestBed.get(ResizeObserverService);
  });

  afterEach(() => {
    clearObservedElements();
  });

  it("should be created", () => {
    expect(resizeObserverService).toBeTruthy();
  });

  it("should emit an event when observed element is resized", (done) => {
    const service: ResizeObserverService = TestBed.get(ResizeObserverService);
    const ele = {} as Element;

    service.observe(ele).subscribe((event: ResizeObserverEntry) => {
      expect(event).toBeTruthy();
      done();
    });

    triggerResize();
  });

  it("should not emit an event when an unobserved element is resized", () => {
    const service: ResizeObserverService = TestBed.get(ResizeObserverService);
    const ele = {} as Element;

    const observable = service
      .observe(ele)
      .subscribe((event: ResizeObserverEntry) => {
        fail("should not happen");
      });

    observable.unsubscribe();
    triggerResize();
  });
});

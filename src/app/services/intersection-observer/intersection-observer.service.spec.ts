import { TestBed } from "@angular/core/testing";
import { IntersectionObserverService } from "./intersection-observer.service";

let triggerIntersection: Function;
let trackedOptions: any;

class FakeIntersectionObserver {
  observed: any[] = [];
  callback: Function;
  constructor(callback: Function, options: any) {
    this.callback = callback;
    trackedOptions = options;

    triggerIntersection = () => {
      this.fakeIntersection();
    };
  }

  fakeIntersection() {
    this.callback(
      this.observed.map((observedElement) => ({ target: observedElement }))
    );
  }

  observe(target: Element) {
    this.observed.push(target);
  }

  unobserve(target: Element) {
    this.observed = this.observed.filter((element) => element !== target);
  }
}

describe("Intersection Observer", () => {
  let intersectionObserverService: IntersectionObserverService;

  afterEach(() => {
    triggerIntersection = () => {};
    trackedOptions = null;
  });

  afterAll(() => {
    // @ts-ignore
    global.IntersectionObserver = null;
  });

  it("should be created", () => {
    // @ts-ignore
    global.IntersectionObserver = FakeIntersectionObserver;
    intersectionObserverService = TestBed.get(IntersectionObserverService);

    expect(intersectionObserverService).toBeTruthy();
  });

  it("should emit an event when intersection observer is triggered", (done) => {
    // @ts-ignore
    global.IntersectionObserver = FakeIntersectionObserver;
    intersectionObserverService = TestBed.get(IntersectionObserverService);
    const element = {} as Element;

    intersectionObserverService
      .observe(element)
      .subscribe((event: IntersectionObserverEntry) => {
        expect(event).toBeTruthy();
        done();
      });

    triggerIntersection();
  });

  it("should not emit an event when an unobserved element triggered intersection observer", () => {
    // @ts-ignore
    global.IntersectionObserver = FakeIntersectionObserver;
    intersectionObserverService = TestBed.get(IntersectionObserverService);

    const element = {} as Element;
    const observable = intersectionObserverService
      .observe(element)
      .subscribe((event: IntersectionObserverEntry) => {
        fail("should not happen");
      });

    observable.unsubscribe();
    triggerIntersection();
  });

  it("should initialize with the correct config", () => {
    // @ts-ignore
    global.IntersectionObserver = FakeIntersectionObserver;
    TestBed.get(IntersectionObserverService);

    expect(trackedOptions).toEqual({ threshold: 0 });
  });

  it("should not initialise on server side", () => {
    // @ts-ignore
    global.IntersectionObserver = undefined;
    TestBed.get(IntersectionObserverService);

    expect(trackedOptions).toBeFalsy();
  });
});

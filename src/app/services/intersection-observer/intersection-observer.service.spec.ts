import { ServiceMock } from "../mocks/MockService";
import { TestBed } from "@angular/core/testing";
import { IntersectionObserverService } from "./intersection-observer.service";

describe("Intersection Observer", () => {
  let intersectionObserverService: ServiceMock<IntersectionObserverService>;
  let triggerIntersection: Function;
  let trackedOptions: any;

  beforeEach(() => {
    let observed: any[] = [];

    // @ts-ignore
    global.IntersectionObserver = class FakeIntersectionObserver {
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
          observed.map((observedElement) => ({ target: observedElement }))
        );
      }

      observe(target: Element) {
        observed.push(target);
      }

      unobserve(target: Element) {
        observed = observed.filter((element) => element !== target);
      }
    };

    intersectionObserverService = TestBed.get(IntersectionObserverService);
  });

  afterAll(() => {
    // @ts-ignore
    global.IntersectionObserver = null;
  });

  it("should be created", () => {
    expect(intersectionObserverService).toBeTruthy();
  });

  it("should emit an event when intersection observer is triggered", (done) => {
    const service: IntersectionObserverService = TestBed.get(
      IntersectionObserverService
    );
    const element = {} as Element;

    service.observe(element).subscribe((event: IntersectionObserverEntry) => {
      expect(event).toBeTruthy();
      done();
    });

    triggerIntersection();
  });

  it("should not emit an event when an unobserved element triggered intersection observer", () => {
    const service: IntersectionObserverService = TestBed.get(
      IntersectionObserverService
    );
    const element = {} as Element;
    const observable = service
      .observe(element)
      .subscribe((event: IntersectionObserverEntry) => {
        fail("should not happen");
      });

    observable.unsubscribe();
    triggerIntersection();
  });

  it("should initialize with the correct config", () => {
    TestBed.get(IntersectionObserverService);

    expect(trackedOptions).toEqual({ threshold: 0 });
  });
});

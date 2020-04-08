import { TestBed } from "@angular/core/testing";
import { ServiceMock } from "../mocks/MockService";
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
  let intersectionObserverService: ServiceMock<IntersectionObserverService>;

  describe("when in browser", () => {
    beforeEach(() => {
      // @ts-ignore
      global.IntersectionObserver = FakeIntersectionObserver;
      intersectionObserverService = TestBed.inject(
        IntersectionObserverService
      ) as ServiceMock<IntersectionObserverService>;
    });

    afterEach(() => {
      triggerIntersection = () => {};
      trackedOptions = null;
      // @ts-ignore
      delete global.IntersectionObserver;
    });

    it("should be created", () => {
      expect(intersectionObserverService).toBeTruthy();
    });

    it("should emit an event when intersection observer is triggered", (done) => {
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
      expect(trackedOptions).toEqual({ threshold: 0 });
    });
  });

  describe("when in server", () => {
    it("should not initialise on server side", () => {
      intersectionObserverService = TestBed.inject(
        IntersectionObserverService
      ) as ServiceMock<IntersectionObserverService>;

      expect(trackedOptions).toBeFalsy();
    });
  });
});

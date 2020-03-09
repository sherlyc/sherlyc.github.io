import { ServiceMock } from "../mocks/MockService";
import { TestBed } from "@angular/core/testing";
import { IntersectionObserverService } from "./intersection-observer.service";

const Global = global;

describe("Intersection Observer", () => {
  let intersectionObserverService: ServiceMock<IntersectionObserverService>;
  let triggerIntersection: Function;

  beforeEach(() => {
    let observed: any[] = [];

    // @ts-ignore
    global.IntersectionObserver = class FakeIntersectionObserver {
      callback: Function;

      constructor(callback: Function) {
        this.callback = callback;

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
    global = Global;
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
});

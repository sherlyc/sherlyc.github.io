import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IntersectionObserverService {
  private entriesMap: WeakMap<Element, Subscriber<IntersectionObserverEntry>>;
  private readonly intersectionObserver?: IntersectionObserver;

  constructor() {
    this.entriesMap = new WeakMap();
    if (typeof IntersectionObserver !== "undefined") {
      this.intersectionObserver = new IntersectionObserver(
        this.emitAll.bind(this),
        { threshold: 0 }
      );
    }
  }

  private emitAll(observedElements: IntersectionObserverEntry[]) {
    observedElements
      .filter((entry) => this.entriesMap.has(entry.target))
      .forEach((entry) => {
        const subscriber = this.entriesMap.get(entry.target);
        if (subscriber) {
          subscriber.next(entry);
        }
      });
  }

  observe(element: Element): Observable<IntersectionObserverEntry> {
    return new Observable(
      (subscriber: Subscriber<IntersectionObserverEntry>) => {
        this.entriesMap.set(element, subscriber);
        if (this.intersectionObserver) {
          this.intersectionObserver.observe(element);
        }

        return () => {
          if (this.intersectionObserver) {
            this.intersectionObserver.unobserve(element);
          }
          this.entriesMap.delete(element);
        };
      }
    );
  }
}

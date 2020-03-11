import { Injectable } from "@angular/core";
import ResizeObserver from "resize-observer-polyfill";
import { Observable, Subscriber } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ResizeObserverService {
  private entriesMap: WeakMap<Element, Subscriber<ResizeObserverEntry>>;
  private readonly resizeObserver?: ResizeObserver;

  constructor() {
    this.entriesMap = new WeakMap();
    if (ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.emitAll.bind(this));
    }
  }

  private emitAll(observedElements: ResizeObserverEntry[]) {
    observedElements
      .filter((entry: ResizeObserverEntry) => this.entriesMap.has(entry.target))
      .forEach((entry: ResizeObserverEntry) => {
        const subscriber = this.entriesMap.get(entry.target);
        if (subscriber) {
          subscriber.next(entry);
        }
      });
  }

  observe(element: Element): Observable<ResizeObserverEntry> {
    return new Observable((subscriber: Subscriber<ResizeObserverEntry>) => {
      this.entriesMap.set(element, subscriber);
      if (this.resizeObserver) {
        this.resizeObserver.observe(element);
      }
      return () => {
        if (this.resizeObserver) {
          this.resizeObserver.unobserve(element);
        }
        this.entriesMap.delete(element);
      };
    });
  }
}

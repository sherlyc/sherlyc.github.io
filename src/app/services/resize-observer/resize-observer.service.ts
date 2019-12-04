import { Injectable } from "@angular/core";
import ResizeObserver from "resize-observer-polyfill";
import { Observable, Subscriber } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ResizeObserverService {
  private entriesMap: WeakMap<Element, Subscriber<ResizeObserverEntry>>;
  private resizeObserver: ResizeObserver;

  constructor() {
    this.entriesMap = new WeakMap();
    this.resizeObserver = new ResizeObserver(this.emitAll.bind(this));
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
    return new Observable((subscriber) => {
      this.entriesMap.set(element, subscriber);
      this.resizeObserver.observe(element);
      return () => {
        this.resizeObserver.unobserve(element);
        this.entriesMap.delete(element);
      };
    });
  }
}

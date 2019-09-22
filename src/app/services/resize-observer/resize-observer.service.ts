import { EventEmitter, Injectable } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

@Injectable({
  providedIn: 'root'
})
export class ResizeObserverService {
  private entriesMap: WeakMap<Element, EventEmitter<any>>;
  resizeObserver: ResizeObserver;

  constructor() {
    this.entriesMap = new WeakMap();
    this.resizeObserver = new ResizeObserver(this.emitAll.bind(this));
  }

  private emitAll(observedElements: ResizeObserverEntry[]) {
    observedElements
      .filter((entry: ResizeObserverEntry) => this.entriesMap.has(entry.target))
      .forEach((entry: ResizeObserverEntry) => {
        const emitter = this.entriesMap.get(entry.target);
        if (emitter) {
          emitter.emit(entry);
        }
      });
  }

  observe(element: Element, emitter: EventEmitter<any>) {
    this.entriesMap.set(element, emitter);
    this.resizeObserver.observe(element);
  }

  unobserve(element: Element) {
    this.resizeObserver.unobserve(element);
    this.entriesMap.delete(element);
  }
}

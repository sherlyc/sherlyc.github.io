import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { RuntimeService } from '../../../services/runtime/runtime.service';

@Directive({ selector: '[appResizeObserver]' })
export class ResizeObserverDirective implements OnDestroy {
  static entriesMap = new WeakMap();
  static resizeObserver: ResizeObserver;

  @Output() resize = new EventEmitter();

  constructor(private el: ElementRef, private runtime: RuntimeService) {
    if (this.runtime.isBrowser()) {
      ResizeObserverDirective.resizeObserver =
        ResizeObserverDirective.resizeObserver ||
        new ResizeObserver(ResizeObserverDirective.emitAll);

      const target = this.el.nativeElement;
      ResizeObserverDirective.entriesMap.set(target, this);
      ResizeObserverDirective.resizeObserver.observe(target);
    }
  }

  private static emitAll(observedElements: ResizeObserverEntry[]) {
    observedElements
      .filter((element) =>
        ResizeObserverDirective.entriesMap.has(element.target)
      )
      .forEach((element) => {
        const directiveInstance = ResizeObserverDirective.entriesMap.get(
          element.target
        );
        directiveInstance.resize.emit(element);
      });
  }

  ngOnDestroy() {
    if (this.runtime.isBrowser()) {
      const target = this.el.nativeElement;
      ResizeObserverDirective.resizeObserver.unobserve(target);
      ResizeObserverDirective.entriesMap.delete(target);
    }
  }
}

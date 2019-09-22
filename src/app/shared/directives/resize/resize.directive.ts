import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';
import { ResizeObserverService } from '../../../services/resize-observer/resize-observer.service';
import { RuntimeService } from '../../../services/runtime/runtime.service';

@Directive({ selector: '[appResizeObserver]' })
export class ResizeDirective implements OnDestroy, AfterViewInit {
  @Output() resize = new EventEmitter();

  constructor(
    private resizeObserverService: ResizeObserverService,
    private el: ElementRef,
    private runtimeService: RuntimeService
  ) {}

  ngAfterViewInit() {
    if (this.runtimeService.isBrowser()) {
      this.resizeObserverService.observe(this.el.nativeElement, this.resize);
    }
  }

  ngOnDestroy(): void {
    if (this.runtimeService.isBrowser()) {
      this.resizeObserverService.unobserve(this.el.nativeElement);
    }
  }
}

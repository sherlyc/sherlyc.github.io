import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from "@angular/core";
import { ResizeObserverService } from "../../../services/resize-observer/resize-observer.service";
import { RuntimeService } from "../../../services/runtime/runtime.service";
import { Subscription } from "rxjs";

@Directive({ selector: "[appResizeObserver]" })
export class ResizeDirective implements OnDestroy, AfterViewInit {
  @Output() resize = new EventEmitter();
  subscription?: Subscription;

  constructor(
    private resizeObserverService: ResizeObserverService,
    private el: ElementRef,
    private runtimeService: RuntimeService
  ) {}

  ngAfterViewInit() {
    if (this.runtimeService.isBrowser()) {
      this.subscription = this.resizeObserverService
        .observe(this.el.nativeElement)
        .subscribe((entry: ResizeObserverEntry) => {
          this.resize.emit(entry);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.runtimeService.isBrowser() && this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

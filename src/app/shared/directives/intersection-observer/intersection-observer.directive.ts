import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output
} from "@angular/core";
import { Subscription } from "rxjs";
import { IntersectionObserverService } from "../../../services/intersection-observer/intersection-observer.service";
import { RuntimeService } from "../../../services/runtime/runtime.service";

@Directive({ selector: "[appIntersectionObserver]" })
export class IntersectionObserverDirective implements OnDestroy, AfterViewInit {
  @Output() intersect = new EventEmitter();
  subscription?: Subscription;

  constructor(
    private intersectionObserverService: IntersectionObserverService,
    private element: ElementRef,
    private runtimeService: RuntimeService
  ) {}

  ngAfterViewInit() {
    if (this.runtimeService.isBrowser()) {
      this.subscription = this.intersectionObserverService
        .observe(this.element.nativeElement)
        .subscribe((entry: IntersectionObserverEntry) => {
          this.intersect.emit(entry);
        });
    }
  }

  ngOnDestroy() {
    if (this.runtimeService.isBrowser() && this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

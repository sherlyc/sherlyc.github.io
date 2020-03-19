import { AfterViewInit, Directive, ElementRef, OnDestroy } from "@angular/core";
import * as PullToRefresh from "pulltorefreshjs";
import { PullToRefreshPointer } from "pulltorefreshjs";
import { RuntimeService } from "../../../services/runtime/runtime.service";

@Directive({
  selector: "[appPullToRefresh]"
})
export class PullToRefreshDirective implements AfterViewInit, OnDestroy {
  pointer!: PullToRefreshPointer;

  constructor(
    private ref: ElementRef,
    private runtimeService: RuntimeService
  ) {}

  ngAfterViewInit(): void {
    if (this.runtimeService.isBrowser()) {
      this.pointer = PullToRefresh.init({
        mainElement: this.ref.nativeElement
      });
    }
  }

  ngOnDestroy(): void {
    this.pointer.destroy();
  }
}

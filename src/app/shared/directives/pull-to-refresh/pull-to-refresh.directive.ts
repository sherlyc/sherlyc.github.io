import { AfterViewInit, Directive, ElementRef, OnDestroy } from "@angular/core";
import { PullToRefreshPointer } from "pulltorefreshjs";
import { RuntimeService } from "../../../services/runtime/runtime.service";

@Directive({
  selector: "[appPullToRefresh]"
})
export class PullToRefreshDirective implements AfterViewInit, OnDestroy {
  pointer?: PullToRefreshPointer;

  constructor(
    private ref: ElementRef,
    private runtimeService: RuntimeService
  ) {}

  ngAfterViewInit(): void {
    if (this.runtimeService.isBrowser()) {
      this.pointer = require("pulltorefreshjs").init({
        mainElement: this.ref.nativeElement
      });
    }
  }

  ngOnDestroy(): void {
    if (this.pointer) {
      this.pointer.destroy();
    }
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import { Subscription } from "rxjs";
import { IOli } from "../../../../common/__types__/IOli";
import { OliService } from "../../services/oli/oli.service";
import { RuntimeService } from "../../services/runtime/runtime.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-oli",
  templateUrl: "./oli.component.html",
  styleUrls: ["./oli.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OliComponent implements IContentBlockComponent, OnInit, OnDestroy {
  @Input() input!: IOli;
  readonly oliAdId: string;
  show = true;
  loading = true;
  subscription?: Subscription;

  constructor(
    private oliService: OliService,
    private runtimeService: RuntimeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.oliAdId = `spade-oli-slot-${Math.random()}`;
  }

  ngOnInit() {
    if (this.runtimeService.isServer()) {
      this.show = false;
      return;
    }
    this.subscription = this.oliService
      .load({ ...this.input.config, elementId: this.oliAdId })
      .pipe(finalize(() => this.changeDetectorRef.detectChanges()))
      .subscribe({
        next: () => (this.loading = false),
        error: () => (this.show = false)
      });
  }

  onClose() {
    this.oliService.destroy(this.oliAdId);
    this.show = false;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

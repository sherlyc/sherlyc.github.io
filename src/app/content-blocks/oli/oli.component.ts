import { Component, Input, OnInit } from "@angular/core";
import { IOli } from "../../../../common/__types__/IOli";
import { OliService } from "../../services/oli/oli.service";
import { RuntimeService } from "../../services/runtime/runtime.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-oli",
  templateUrl: "./oli.component.html",
  styleUrls: ["./oli.component.scss"]
})
export class OliComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IOli;
  readonly oliAdId: string;
  show = true;
  loading = true;

  constructor(
    private oliService: OliService,
    private runtimeService: RuntimeService
  ) {
    this.oliAdId = `spade-oli-slot-${Math.random()}`;
  }

  ngOnInit() {
    if (this.runtimeService.isServer()) {
      return;
    }
    this.oliService.load(this.oliAdId).subscribe({
      next: () => (this.loading = false),
      error: () => (this.show = false)
    });
  }

  onClose() {
    this.oliService.destroy(this.oliAdId);
    this.show = false;
  }
}

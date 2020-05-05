import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IOli } from "../../../../common/__types__/IOli";
import { StoreService } from "../../services/store/store.service";
import { isFuture, isPast, parseISO } from "date-fns";

@Component({
  selector: "app-oli",
  templateUrl: "./oli.component.html",
  styleUrls: ["./oli.component.scss"]
})
export class OliComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IOli;
  show = true;
  loading = true;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    const hideUntil = this.storeService.get<string>("oli-hide-until");
    const showOli = hideUntil === null || isPast(parseISO(hideUntil));
    if (showOli) {
      // make call the gpt to render
    } else {
      this.show = false;
    }
  }
}

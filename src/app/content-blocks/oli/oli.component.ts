import { Component, Input, OnInit } from "@angular/core";
import { formatISO, isPast, parseISO, set } from "date-fns";
import { IOli } from "../../../../common/__types__/IOli";
import { OliService } from "../../services/oli/oli.service";
import { StoreService } from "../../services/store/store.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-oli",
  templateUrl: "./oli.component.html",
  styleUrls: ["./oli.component.scss"]
})
export class OliComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IOli;
  show = true;
  loading = true;

  constructor(
    private storeService: StoreService,
    private oliService: OliService
  ) {}

  async ngOnInit() {
    if (this.isFirstTimeForToday()) {
      this.oliService.load("oliAdId").subscribe({
        next: () => {
          this.loading = false;
          this.recordShownState();
        },
        error: () => {
          this.show = false;
          this.recordShownState();
        }
      });
    } else {
      this.show = false;
    }
  }

  private isFirstTimeForToday(): boolean {
    const hideUntil = this.storeService.get<string>("oli-hide-until");
    return hideUntil === null || isPast(parseISO(hideUntil));
  }

  private recordShownState(): void {
    const endOfToday = formatISO(
      set(new Date(), { hours: 23, minutes: 59, seconds: 59 })
    );
    this.storeService.set<string>("oli-hide-until", endOfToday);
  }
}

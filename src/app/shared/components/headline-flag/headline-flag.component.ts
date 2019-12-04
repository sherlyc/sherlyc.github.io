import { Component, Input } from "@angular/core";
import { HeadlineFlags } from "../../../../../common/HeadlineFlags";

@Component({
  selector: "app-headline-flag",
  templateUrl: "./headline-flag.component.html",
  styleUrls: ["./headline-flag.component.scss"]
})
export class HeadlineFlagComponent {
  @Input() flag?: HeadlineFlags;
}

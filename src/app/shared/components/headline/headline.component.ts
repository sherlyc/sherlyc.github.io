import { Component, Input } from "@angular/core";
import { HeadlineFlags } from "../../../../../common/HeadlineFlags";
import * as moment from "moment";

@Component({
  selector: "app-headline",
  templateUrl: "./headline.component.html",
  styleUrls: ["./headline.component.scss"]
})
export class HeadlineComponent {
  @Input() headline?: string;
  @Input() timeStamp?: number;
  @Input() headlineFlags?: HeadlineFlags[];
  @Input() textColor?: string;
  @Input() identifier?: string;
  @Input() identifierColor = "#2AAAF5";

  showTimeAgo() {
    const twoHours = 2 * 3600;
    const seconds = moment().diff(
      moment((this.timeStamp as number) * 1000),
      "seconds"
    );
    return this.timeStamp && !(seconds >= twoHours || seconds < 0);
  }
}

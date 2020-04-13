import { Component, Input, OnInit } from "@angular/core";
import { fromUnixTime, isWithinInterval, subHours } from "date-fns";
import { HeadlineFlags } from "../../../../../common/HeadlineFlags";

@Component({
  selector: "app-headline",
  templateUrl: "./headline.component.html",
  styleUrls: ["./headline.component.scss"]
})
export class HeadlineComponent implements OnInit {
  @Input() headline?: string;
  @Input() timeStamp?: number;
  @Input() headlineFlags?: HeadlineFlags[];
  @Input() textColor?: string;
  @Input() identifier?: string;
  @Input() identifierColor?: string;

  ngOnInit() {
    this.identifierColor = this.identifierColor || "#2AAAF5";
  }

  showTimeAgo() {
    const currDate = new Date();
    return (
      this.timeStamp &&
      isWithinInterval(fromUnixTime(this.timeStamp), {
        start: subHours(currDate, 2),
        end: currDate
      })
    );
  }
}

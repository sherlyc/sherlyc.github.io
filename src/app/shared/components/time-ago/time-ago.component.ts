import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { format, fromUnixTime } from "date-fns";

const ONE_HOUR_IN_SECONDS = 3600;
const ONE_MINUTE_IN_SECONDS = 60;

@Component({
  selector: "app-time-ago",
  templateUrl: "./time-ago.component.html",
  styleUrls: ["./time-ago.component.scss"]
})
export class TimeAgoComponent implements OnInit {
  constructor() {}

  @Input()
  separator?: "left" | "right";
  @Input()
  timestamp!: number;
  @Input() textColor = "#d12421";
  timeAgo!: string;

  @HostBinding("style.display") display = "inline-block";

  ngOnInit() {
    this.timeAgo = this.formatTime();
    this.display = !!this.timeAgo ? "inline-block" : "none";
  }

  formatTime() {
    const secondsAgo = Math.floor((Date.now() - this.timestamp * 1000) / 1000);

    if (secondsAgo > ONE_HOUR_IN_SECONDS * 2 || secondsAgo < 0) {
      return "";
    }
    if (secondsAgo >= ONE_HOUR_IN_SECONDS && secondsAgo <= ONE_HOUR_IN_SECONDS * 2) {
      return format(fromUnixTime(this.timestamp), "H:MMa");
    }
    return this.timeAgoFormat(secondsAgo);
  }

  private timeAgoFormat(secondsAgo: number) {
    const hours = Math.floor(secondsAgo / ONE_HOUR_IN_SECONDS);
    const minutes = Math.floor((secondsAgo % ONE_HOUR_IN_SECONDS) / ONE_MINUTE_IN_SECONDS);
    const hoursText = hours === 0 ? "" : `${hours} hour `;
    const minutesText = minutes === 0 ? "" : `${minutes} min `;
    return `${hoursText}${minutesText}ago`;
  }
}

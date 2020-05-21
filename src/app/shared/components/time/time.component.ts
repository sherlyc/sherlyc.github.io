import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { differenceInSeconds, format, fromUnixTime } from "date-fns";

const ONE_HOUR_IN_SECONDS = 3600;
const ONE_MINUTE_IN_SECONDS = 60;

@Component({
  selector: "app-time",
  templateUrl: "./time.component.html",
  styleUrls: ["./time.component.scss"]
})
export class TimeComponent implements OnInit {
  constructor() {}

  @Input()
  separator?: "left" | "right";
  @Input()
  timestamp!: number;
  @Input() textColor = "#d12421";
  time!: string;

  private static timeAgoFormat(secondsAgo: number) {
    const hours = Math.floor(secondsAgo / ONE_HOUR_IN_SECONDS);
    const minutes = Math.floor((secondsAgo % ONE_HOUR_IN_SECONDS) / ONE_MINUTE_IN_SECONDS);
    const hoursText = hours === 0 ? "" : `${hours} hour `;
    const minutesText = minutes === 0 ? "" : `${minutes} min `;
    return `${hoursText}${minutesText}ago`;
  }

  ngOnInit() {
    this.time = this.formatTime();
  }

  formatTime() {
    const inputDate = fromUnixTime(this.timestamp);
    const secondsAgo = differenceInSeconds(Date.now(), inputDate);

    if (secondsAgo > ONE_HOUR_IN_SECONDS * 2 || secondsAgo < 0) {
      return "";
    }
    if (secondsAgo >= ONE_HOUR_IN_SECONDS && secondsAgo <= ONE_HOUR_IN_SECONDS * 2) {
      return format(inputDate, "H:mma").toLowerCase();
    }
    return TimeComponent.timeAgoFormat(secondsAgo);
  }
}

import { Component, HostBinding, Input, OnInit } from "@angular/core";
import {
  formatTime,
  timeColor
} from "../../utils/timestamp-helper/timestamp-helper";

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
  @Input()
  @HostBinding("style.--timestamp-color")
  textColor!: string;
  @Input()
  @HostBinding("style.--timestamp-font-weight")
  fontWeight!: string | number;
  @Input()
  showBullet = false;

  time!: string;

  ngOnInit(): void {
    this.time = formatTime(this.timestamp);
    if (!this.textColor) {
      this.textColor = this.showBullet ? timeColor(this.timestamp) : "#d12421";
    }
  }
}

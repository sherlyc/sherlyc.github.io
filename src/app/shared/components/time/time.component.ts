import { Component, Input, OnInit } from "@angular/core";
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
  textColor!: string;
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

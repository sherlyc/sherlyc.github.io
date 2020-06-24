import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IDailyFix } from "../../../../common/__types__/IDailyFix";

@Component({
  selector: "app-daily-fix",
  templateUrl: "./daily-fix.component.html",
  styleUrls: ["./daily-fix.component.scss"]
})
export class DailyFixComponent implements OnInit, IContentBlockComponent {
  @Input() input!: IDailyFix;
  constructor() {}

  ngOnInit(): void {}
}

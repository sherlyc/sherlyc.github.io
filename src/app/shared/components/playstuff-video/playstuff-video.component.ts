import { Component, Input, OnInit } from "@angular/core";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";

@Component({
  selector: "app-playstuff-video",
  templateUrl: "./playstuff-video.component.html",
  styleUrls: ["./playstuff-video.component.scss"]
})
export class PlayStuffVideoComponent implements OnInit {
  @Input()
  image!: string;
  @Input()
  text!: string;
  @Input()
  orientation!: Orientation;

  constructor() {}

  ngOnInit(): void {}
}

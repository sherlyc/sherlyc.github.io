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
  id!: number;
  @Input()
  orientation: Orientation = Orientation.Portrait;
  @Input()
  highlight: boolean = false;

  url!: string;

  constructor() {}

  ngOnInit(): void {
    this.url = `https://play.stuff.co.nz/details/_${this.id}`;
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";

@Component({
  selector: "app-play-stuff-video",
  templateUrl: "./play-stuff-video.component.html",
  styleUrls: ["./play-stuff-video.component.scss"]
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

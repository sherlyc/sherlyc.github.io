import { Component, Input, OnInit } from "@angular/core";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { map } from "lodash-es";

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
  id!: string;
  @Input()
  orientation!: {
    mobile: Orientation;
    tablet: Orientation;
    desktop: Orientation;
  };
  @Input()
  highlight = false;
  classNames: string[] = [];

  url!: string;

  constructor() {}

  ngOnInit(): void {
    this.url = `https://play.stuff.co.nz/details/_${this.id}`;
    this.classNames = map(
      this.orientation,
      (orientation, device) => `${orientation}-${device}`
    );
  }
}

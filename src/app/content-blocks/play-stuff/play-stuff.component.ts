import { Component, OnInit } from "@angular/core";
import { IPlayStuff } from "../../../../common/__types__/IPlayStuff";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-play-stuff",
  templateUrl: "./play-stuff.component.html",
  styleUrls: ["./play-stuff.component.scss"]
})
export class PlayStuffComponent implements IContentBlockComponent, OnInit {
  index!: number;
  input!: IPlayStuff;

  constructor() {}

  ngOnInit(): void {}
}

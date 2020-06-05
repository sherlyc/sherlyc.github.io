import { Component, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IPlayStuff } from "../../../../common/__types__/IPlayStuff";

@Component({
  selector: "app-playstuff",
  templateUrl: "./playstuff.component.html",
  styleUrls: ["./playstuff.component.scss"]
})
export class PlayStuffComponent implements IContentBlockComponent, OnInit {
  index!: number;
  input!: IPlayStuff;

  constructor() {}

  ngOnInit(): void {}
}

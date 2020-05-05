import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IOli } from "../../../../common/__types__/IOli";

@Component({
  selector: "app-oli",
  templateUrl: "./oli.component.html",
  styleUrls: ["./oli.component.scss"]
})
export class OliComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IOli;
  constructor() {}

  ngOnInit(): void {}
}

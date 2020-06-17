import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IFeatureContainer } from "../../../../common/__types__/IFeatureContainer";
import { IDefcon } from "../../../../common/__types__/IDefcon";

@Component({
  selector: "app-defcon",
  templateUrl: "./defcon.component.html",
  styleUrls: ["./defcon.component.scss"],
})
export class DefconComponent implements OnInit, IContentBlockComponent {
  @Input() input!: IDefcon;
  index!: number;
  constructor() {}

  ngOnInit(): void {}
}

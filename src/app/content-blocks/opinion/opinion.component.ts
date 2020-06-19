import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IOpinion } from "../../../../common/__types__/IOpinion";

@Component({
  selector: "app-opinion",
  templateUrl: "./opinion.component.html",
  styleUrls: ["./opinion.component.scss"]
})
export class OpinionComponent implements IContentBlockComponent, OnInit {
  @Input()
  input!: IOpinion;

  constructor() {}

  ngOnInit(): void {}
}

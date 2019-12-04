import { Component, Input, OnInit } from "@angular/core";
import { IErrorBlock } from "../../../../common/__types__/IErrorBlock";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-error-block-component",
  templateUrl: "./error-block.component.html",
  styleUrls: ["./error-block.component.scss"]
})
export class ErrorBlockComponent implements IContentBlockComponent, OnInit {
  @Input()
  input!: IErrorBlock;

  constructor() {}

  ngOnInit() {}
}

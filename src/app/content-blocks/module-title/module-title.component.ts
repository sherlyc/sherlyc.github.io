import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IModuleTitle } from "../../../../common/__types__/IModuleTitle";

@Component({
  selector: "app-module-title-component",
  templateUrl: "./module-title.component.html",
  styleUrls: ["./module-title.component.scss"]
})
export class ModuleTitleComponent implements IContentBlockComponent, OnInit {
  @Input()
  input!: IModuleTitle;

  constructor() {}

  ngOnInit() {}
}

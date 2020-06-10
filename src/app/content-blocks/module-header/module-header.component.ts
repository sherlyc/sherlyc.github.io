import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IModuleHeader } from "../../../../common/__types__/IModuleHeader";

@Component({
  selector: "app-module-header",
  templateUrl: "./module-header.component.html",
  styleUrls: ["./module-header.component.scss"]
})
export class ModuleHeaderComponent implements OnInit, IContentBlockComponent {
  @Input() input!: IModuleHeader;
  variationStyle?: string;

  constructor() { }

  ngOnInit(): void {
    this.variationStyle = `variation-${this.input.variation}`;
  }
}

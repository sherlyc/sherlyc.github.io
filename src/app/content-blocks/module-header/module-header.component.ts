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
  variationClass?: string;

  constructor() { }

  ngOnInit(): void {
    const { variation } = this.input;
    this.variationClass = variation ? `variation-${this.input.variation}`.toLowerCase() : undefined;
  }
}

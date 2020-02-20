import { Component, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IModuleSubtitle } from "../../../../common/__types__/IModuleSubtitle";

@Component({
  selector: "app-module-subtitle",
  templateUrl: "./module-subtitle.component.html",
  styleUrls: ["./module-subtitle.component.scss"]
})
export class ModuleSubtitleComponent implements IContentBlockComponent {
  input!: IModuleSubtitle;
}

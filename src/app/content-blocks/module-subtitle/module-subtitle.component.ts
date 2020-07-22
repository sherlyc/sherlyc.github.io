import { Component } from "@angular/core";
import { IModuleSubtitle } from "../../../../common/__types__/IModuleSubtitle";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-module-subtitle",
  templateUrl: "./module-subtitle.component.html",
  styleUrls: ["./module-subtitle.component.scss"]
})
export class ModuleSubtitleComponent implements IContentBlockComponent {
  input!: IModuleSubtitle;
}

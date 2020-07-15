import { Component, Input } from "@angular/core";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBasicAdUnit } from "../../../../common/__types__/IBasicAdUnit";
import { IContainer } from "../../../../common/__types__/IContainer";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements IContentBlockComponent {
  @Input() input!: IContainer;
  ad: IBasicAdUnit = {type:ContentBlockType.BasicAdUnit, context: "HeaderFullWidth"};
}

import { Component, Input } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IStickyContainer } from "../../../../common/__types__/IStickyContainer";
@Component({
  selector: "app-sticky-container",
  templateUrl: "./sticky-container.component.html",
  styleUrls: ["./sticky-container.component.scss"]
})
export class StickyContainerComponent implements IContentBlockComponent {
  constructor() {}
  @Input() input!: IStickyContainer;
}

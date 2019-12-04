import { Component, Input } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IColumnContainer } from "../../../../common/__types__/IColumnContainer";

@Component({
  selector: "app-column-container",
  templateUrl: "./column-container.component.html",
  styleUrls: ["./column-container.component.scss"]
})
export class ColumnContainerComponent implements IContentBlockComponent {
  @Input() input!: IColumnContainer;

  trackByFn(index: number) {
    return index;
  }
}

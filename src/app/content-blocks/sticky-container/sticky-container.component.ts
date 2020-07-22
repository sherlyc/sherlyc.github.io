import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IStickyContainer } from "../../../../common/__types__/IStickyContainer";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-sticky-container",
  templateUrl: "./sticky-container.component.html",
  styleUrls: ["./sticky-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickyContainerComponent implements IContentBlockComponent {
  constructor() {}
  @Input() input!: IStickyContainer;
}

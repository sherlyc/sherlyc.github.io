import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IStickyContainer } from "../../../../common/__types__/IStickyContainer";
@Component({
  selector: "app-sticky-container",
  templateUrl: "./sticky-container.component.html",
  styleUrls: ["./sticky-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickyContainerComponent
  implements IContentBlockComponent, OnInit {
  constructor() {}
  @Input() input!: IStickyContainer;

  @HostBinding("style.top") topGap = "50px";
  ngOnInit(): void {
    this.topGap = this.input.topGap || this.topGap;
  }
}

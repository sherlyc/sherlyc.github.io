import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IBulletList } from "../../../../common/__types__/IBulletList";

@Component({
  selector: "app-bullet-list-unit",
  templateUrl: "./bullet-list.component.html",
  styleUrls: ["./bullet-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulletListComponent implements IContentBlockComponent {
  @Input() input!: IBulletList;
  index!: number;
}

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import { IBasicAdUnit } from "../../../../common/__types__/IBasicAdUnit";
import { ClassNameService } from "../../services/class-name/class-name.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-basic-ad-unit",
  template: "",
  styleUrls: ["./basic-ad-unit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicAdUnitComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IBasicAdUnit;

  @HostBinding("class") className?: string;

  ngOnInit() {
    this.className = ClassNameService.generateClassName(this.input.context);
  }
}

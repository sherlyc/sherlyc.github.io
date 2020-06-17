import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { IExternalContentUnit } from "../../../../common/__types__/IExternalContentUnit";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-external-content-unit",
  templateUrl: "./external-content-unit.component.html",
  styleUrls: ["./external-content-unit.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExternalContentUnitComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IExternalContentUnit;
  @HostBinding("style.margin") margin = "0";
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.margin = this.input.margin;
  }

  getUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.input.url);
  }
}

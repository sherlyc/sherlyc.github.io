import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import {
  IExternalContentDeviceConfig,
  IExternalContentUnit
} from "../../../../common/__types__/IExternalContentUnit";
import { DomSanitizer } from "@angular/platform-browser";
import { MediaQuery } from "../grid-container/__types__/MediaQuery";

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

  layouts!: {
    mobile: IExternalContentDeviceConfig;
    tablet: IExternalContentDeviceConfig;
    desktop: IExternalContentDeviceConfig;
  };

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const { url, mobile, tablet = mobile, desktop = tablet } = this.input;
    this.layouts = { mobile, tablet, desktop };
    this.margin = mobile.margin;
  }

  getUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.input.url);
  }

  getCss() {
    const { mobile, tablet, desktop } = this.layouts;

    return {
      [MediaQuery.Mobile]: {
        height: mobile.height,
        width: mobile.width
      },
      [MediaQuery.Tablet]: {
        height: tablet.height,
        width: tablet.width
      },
      [MediaQuery.Desktop]: {
        height: desktop.height,
        width: desktop.width
      }
    };
  }
}

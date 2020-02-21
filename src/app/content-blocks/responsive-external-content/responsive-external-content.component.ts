import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import {
  IResponsiveExternalContentDeviceConfig,
  IResponsiveExternalContent
} from "../../../../common/__types__/IResponsiveExternalContent";
import { DomSanitizer } from "@angular/platform-browser";
import { MediaQuery } from "../grid-container/__types__/MediaQuery";

@Component({
  selector: "app-responsive-external-content",
  templateUrl: "./responsive-external-content.component.html",
  styleUrls: ["./responsive-external-content.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveExternalContentComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IResponsiveExternalContent;
  @HostBinding("style.margin") margin = "0";

  layouts!: {
    mobile: IResponsiveExternalContentDeviceConfig;
    tablet: IResponsiveExternalContentDeviceConfig;
    desktop: IResponsiveExternalContentDeviceConfig;
  };

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const { mobile, tablet = mobile, desktop = tablet } = this.input;
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

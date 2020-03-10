import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IResponsiveExternalContent } from "../../../../common/__types__/IResponsiveExternalContent";
import { DomSanitizer } from "@angular/platform-browser";
import { MediaQuery } from "../grid-container/__types__/MediaQuery";
import { GlobalStyleService } from "../../services/global-style/global-style.service";

@Component({
  selector: "app-responsive-external-content",
  templateUrl: "./responsive-external-content.component.html",
  styleUrls: ["./responsive-external-content.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveExternalContentComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IResponsiveExternalContent;
  @HostBinding("class") class = "";
  isShown?: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private globalStyles: GlobalStyleService
  ) {}

  ngOnInit(): void {
    this.isShown = !this.input.lazyLoad;
    const { mobile, tablet = mobile, desktop = tablet } = this.input;

    this.class = this.globalStyles.injectStyle({
      [MediaQuery.Mobile]: {
        margin: mobile.margin
      },
      [MediaQuery.Tablet]: {
        margin: tablet.margin
      },
      [MediaQuery.Desktop]: {
        margin: desktop.margin
      }
    });
  }

  getUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.input.url);
  }

  getCss() {
    const { mobile, tablet = mobile, desktop = tablet } = this.input;

    return {
      [MediaQuery.Mobile]: {
        paddingBottom: mobile.height,
        width: mobile.width
      },
      [MediaQuery.Tablet]: {
        paddingBottom: tablet.height,
        width: tablet.width
      },
      [MediaQuery.Desktop]: {
        paddingBottom: desktop.height,
        width: desktop.width
      }
    };
  }
}

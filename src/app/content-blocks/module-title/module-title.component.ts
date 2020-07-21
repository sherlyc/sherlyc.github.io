import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IModuleTitle } from "../../../../common/__types__/IModuleTitle";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-module-title-component",
  templateUrl: "./module-title.component.html",
  styleUrls: ["./module-title.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleTitleComponent implements IContentBlockComponent {
  @Input()
  input!: IModuleTitle;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics() {
    const { displayName } = this.input;

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.MODULE_TITLE_CLICKED,
      title: displayName
    });
  }
}

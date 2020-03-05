import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IModuleTitle } from "../../../../common/__types__/IModuleTitle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-module-title-component",
  templateUrl: "./module-title.component.html",
  styleUrls: ["./module-title.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleTitleComponent implements IContentBlockComponent, OnInit {
  @Input()
  input!: IModuleTitle;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {}

  sendAnalytics() {
    const { displayName } = this.input;

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.MODULE_TITLE_CLICKED,
      title: displayName
    });
  }
}

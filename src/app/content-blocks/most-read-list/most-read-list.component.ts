import { Component, Input } from "@angular/core";
import { IMostReadList } from "../../../../common/__types__/IMostReadList";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-most-read-list",
  templateUrl: "./most-read-list.component.html",
  styleUrls: ["./most-read-list.component.scss"]
})
export class MostReadListComponent implements IContentBlockComponent {
  @Input() input!: IMostReadList;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics(id: string, title: string, strapName: string) {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: id
    });
  }
}

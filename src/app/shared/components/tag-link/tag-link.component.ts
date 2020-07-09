import { Component, Input } from "@angular/core";
import { AnalyticsEventsType } from "../../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../../services/analytics/analytics.service";

@Component({
  selector: "app-tag-link",
  templateUrl: "./tag-link.component.html",
  styleUrls: ["./tag-link.component.scss"]
})
export class TagLinkComponent {
  @Input() name!: string;
  @Input() url!: string;
  @Input() color?: string;

  constructor(private analyticsService: AnalyticsService) {}

  onClick(event: Event) {
    event.stopPropagation();
    this.sendAnalytics();
  }

  private sendAnalytics() {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_TAG_CLICKED
    });
  }
}

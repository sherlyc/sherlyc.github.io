import { Component, Input } from "@angular/core";
import { AnalyticsService } from "../../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../../services/analytics/__types__/AnalyticsEventsType";

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

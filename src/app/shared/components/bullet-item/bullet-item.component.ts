import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AnalyticsEventsType } from "../../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../../services/analytics/analytics.service";
import { IBulletItem } from "../../../../../common/__types__/IBulletItem";

@Component({
  selector: "app-bullet",
  templateUrl: "./bullet-item.component.html",
  styleUrls: ["./bullet-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulletItemComponent {
  @Input() input!: IBulletItem;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics() {
    const { strapName, title, id } = this.input;

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: id
    });
  }
}

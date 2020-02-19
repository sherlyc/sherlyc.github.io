import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IBulletList } from "../../../../common/__types__/IBulletList";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IBulletItem } from "../../../../common/__types__/IBulletItem";

@Component({
  selector: "app-bullet-list-unit",
  templateUrl: "./bullet-list.component.html",
  styleUrls: ["./bullet-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulletListComponent implements IContentBlockComponent {
  @Input() input!: IBulletList;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics(item: IBulletItem) {
    const { strapName, linkText, id } = item;
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: linkText,
      articleId: id
    });
  }
}
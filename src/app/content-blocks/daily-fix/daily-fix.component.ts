import { Component, Input, OnInit } from "@angular/core";
import { IDailyFix } from "../../../../common/__types__/IDailyFix";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-daily-fix",
  templateUrl: "./daily-fix.component.html",
  styleUrls: ["./daily-fix.component.scss"]
})
export class DailyFixComponent implements OnInit, IContentBlockComponent {
  @Input() input!: IDailyFix;
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {}

  sendAnalytics(item: IHomepageArticleContent) {
    const { title, id } = item;
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: this.input.strapName,
      articleHeadline: title,
      articleId: id
    });
  }
}

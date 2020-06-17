import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IDefcon } from "../../../../common/__types__/IDefcon";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-defcon",
  templateUrl: "./defcon.component.html",
  styleUrls: ["./defcon.component.scss"],
})
export class DefconComponent implements OnInit, IContentBlockComponent {
  @Input() input!: IDefcon;
  index!: number;
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {}

  sendAnalytics(item: IHomepageArticleContent) {
    const { title, id } = item;
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: this.input.strapName,
      articleHeadline: title,
      articleId: id,
    });
  }
}

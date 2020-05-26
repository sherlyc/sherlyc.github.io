import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IHomepageArticle } from "../../../../common/__types__/IHomepageArticle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { map } from "lodash-es";

@Component({
  selector: "app-homepage-article",
  templateUrl: "./homepage-article.component.html",
  styleUrls: ["./homepage-article.component.scss"]
})
export class HomepageArticleComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IHomepageArticle;
  @Input() index!: number;
  classNames: string[] = [];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.classNames = map(
      this.input.orientation,
      (orientation, device) => `${orientation}-${device}`
    );
  }

  sendAnalytics() {
    const { strapName, title } = this.input.analytics;

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: this.input.id
    });
  }
}

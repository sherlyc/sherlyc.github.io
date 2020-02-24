import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { IResponsiveBigImageArticleUnit } from "../../../../common/__types__/IResponsiveBigImageArticleUnit";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-responsive-big-image-article",
  templateUrl: "./responsive-big-image-article.component.html",
  styleUrls: ["./responsive-big-image-article.component.scss"]
})
export class ResponsiveBigImageArticleComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IResponsiveBigImageArticleUnit;
  @HostBinding("class.pumped") pumped = false;
  index!: number;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.pumped = !!this.input.pumped;
  }

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

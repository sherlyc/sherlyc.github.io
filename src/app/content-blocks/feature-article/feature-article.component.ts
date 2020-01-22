import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IFeatureArticle } from "../../../../common/__types__/IFeatureArticle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-text-box-article",
  templateUrl: "./feature-article.component.html",
  styleUrls: ["./feature-article.component.scss"]
})
export class FeatureArticleComponent implements IContentBlockComponent, OnInit {
  @Input() input!: IFeatureArticle;
  index?: number;

  boxStyle = {};

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.boxStyle = this.input.applyGradient
      ? this.gradientBoxStyle()
      : this.solidBoxStyle();
  }

  gradientBoxStyle() {
    const { textColor, boxColor } = this.input;
    const gradientHeight = 30;
    return {
      position: "relative",
      padding: `${gradientHeight + 10}px 10px 10px`,
      height: `calc(100% + ${gradientHeight}px)`,
      "margin-top": `-${gradientHeight}px`,
      "background-image": `linear-gradient(rgba(0,0,0,0) 0%, ${boxColor} ${gradientHeight}px, ${boxColor} 100%)`,
      color: textColor
    };
  }

  solidBoxStyle() {
    const { textColor, boxColor } = this.input;
    return {
      position: "relative",
      padding: "10px",
      height: "100%",
      background: boxColor,
      color: textColor
    };
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

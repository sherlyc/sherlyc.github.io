import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { ITextBoxArticle } from "../../../../common/__types__/ITextBoxArticle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";

@Component({
  selector: "app-text-box-article",
  templateUrl: "./text-box-article.component.html",
  styleUrls: ["./text-box-article.component.scss"]
})
export class TextBoxArticleComponent implements IContentBlockComponent, OnInit {
  @Input() input!: ITextBoxArticle;
  index?: number;

  boxStyle?: any;
  textStyle?: any;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    const { textColor, boxColor, applyGradient = false } = this.input;

    this.textStyle = { color: textColor };
    this.boxStyle = this.getBoxStyle(boxColor, applyGradient);
  }

  getBoxStyle(boxColor: string, applyGradient: boolean) {
    if (applyGradient) {
      const gradientHeight = 20;
      return {
        "position": "relative",
        "padding": `${gradientHeight + 10}px 10px 10px`,
        "height": `calc(100% + ${gradientHeight}px)`,
        "margin-top": `-${gradientHeight}px`,
        "background-image": `linear-gradient(rgba(0,0,0,0) 0%, ${boxColor} ${gradientHeight}px, ${boxColor} 100%)`
      };
    }

    return {
      "position": "relative",
      "padding": "10px",
      "height": "100%",
      "background": boxColor
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

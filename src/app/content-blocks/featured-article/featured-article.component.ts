import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import { IFeaturedArticle } from "../../../../common/__types__/IFeaturedArticle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-text-box-article",
  templateUrl: "./featured-article.component.html",
  styleUrls: ["./featured-article.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedArticleComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IFeaturedArticle;
  @HostBinding("class.pumped") pumped = false;
  index?: number;

  boxStyle = {};

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.boxStyle = this.input.applyGradient
      ? this.gradientBoxStyle()
      : this.solidBoxStyle();
    this.pumped = !!this.input.pumped;
  }

  gradientBoxStyle() {
    const { textColor, boxColor } = this.input;
    const gradientHeight = 30;
    return {
      position: "relative",
      padding: `${gradientHeight + 10}px 10px 10px`,
      marginTop: `-${gradientHeight}px`,
      backgroundImage: `linear-gradient(rgba(0,0,0,0) 0%, ${boxColor} ${gradientHeight}px, ${boxColor} 100%)`,
      color: textColor
    };
  }

  solidBoxStyle() {
    const { textColor, boxColor } = this.input;
    return {
      padding: "10px",
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
